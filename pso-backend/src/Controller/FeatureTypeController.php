<?php
namespace Src\Controller;
use Src\TableGateways\FeatureTypeGateway;

class FeatureTypeController
{
    private $db;
    private $requestMethod;
    private $featureTypeId;

    private $FeatureTypeGateway;

    public function __construct($db, $requestMethod, $featureTypeId)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->featureTypeId = $featureTypeId;

        $this->FeatureTypeGateway = new FeatureTypeGateway($db);
    }

    public function processRequest()
    {
        switch ($this->requestMethod)
        {
            case 'GET':
                if ($this->featureTypeId)
                {
                    $response = $this->getFeatureType($this->featureTypeId);
                }
                else
                {
                    $response = $this->getAllFeatureTypes();
                };
                break;
            case 'POST':
                $response = $this->createFeatureTypeFromRequest();
                break;
            case 'PUT':
                break;
            case 'DELETE':
                $response = $this->deleteFeature($this->featureTypeId);
                break;
            default:
                $response = $this->notFoundResponse();
                break;
        }
        header($response['status_code_header']);
        if ($response['body'])
        {
            echo $response['body'];
        }
    }

    private function getAllFeatureTypes()
    {
        $result = $this->FeatureTypeGateway->getAllFeatureTypes();
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function getFeatureType($id)
    {
        $result = $this->FeatureTypeGateway->getFeatureType($id);
        if (!$result)
        {
            return $this->notFoundResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function deleteFeature($id)
    {
        $result = $this->FeatureTypeGateway->getFeatureType($id);
        if (!$result)
        {
            return $this->notFoundResponse();
        }
        $this->FeatureTypeGateway->delete($id);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = null;
        return $response;
    }

    private function createFeatureTypeFromRequest()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (!$this->validateFeatureType($input))
        {
            return $this->unprocessableEntityResponse();
        }
        $this->FeatureTypeGateway->insert($input);
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = null;
        return $response;
    }

    private function unprocessableEntityResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
        $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
        return $response;
    }
    
    private function validateFeatureType($input)
    {
        if (!isset($input['Name']))
        {
            return false;
        }
        return true;
    }
    
    private function notFoundResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }
}