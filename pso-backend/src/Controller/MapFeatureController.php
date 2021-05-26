<?php
namespace Src\Controller;
use Src\TableGateways\MapFeatureGateway;

class MapFeatureController
{
    private $db;
    private $requestMethod;
    private $featureTypeId;

    private $mapFeatureGateway;

    public function __construct($db, $requestMethod, $featureTypeId)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->featureTypeId = $featureTypeId;

        $this->mapFeatureGateway = new MapFeatureGateway($db);
    }

    public function processRequest()
    {
        switch ($this->requestMethod)
        {
            case 'GET':
                if ($this->featureTypeId)
                {
                    $response = $this->getFeaturesOfType($this->featureTypeId);
                }
                else
                {
                    $response = $this->getAllFeatures();
                };
                break;
            case 'POST':
                $response = $this->createMapFeatureFromRequest();
                break;
            case 'PUT':
                break;
            case 'DELETE':
                $response = $this->deleteFeature($this->userId);
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

    private function getAllFeatures()
    {
        $result = $this->mapFeatureGateway->getAllFeatures();
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function getFeaturesOfType($id)
    {
        $result = $this->mapFeatureGateway->getFeaturesOfType($id);
        if (!$result)
        {
            return $this->notFoundResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function createMapFeatureFromRequest()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (!$this->validateFeature($input))
        {
            return $this->unprocessableEntityResponse();
        }
        $this->mapFeatureGateway->insert($input);
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = null;
        return $response;
    }


    private function deleteFeature($id)
    {
        $result = $this->mapFeatureGateway->getFeature($id);
        if (!$result)
        {
            return $this->notFoundResponse();
        }
        $this->mapFeatureGateway->delete($id);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = null;
        return $response;
    }

    private function validateFeature($input)
    {
        if (!isset($input['XCoord']))
        {
            return false;
        }
        
        if (!isset($input['YCoord']))
        {
            return false;
        }

        if (!isset($input['Description']))
        {
            return false;
        }

        if (!isset($input['FeatureTypeId']))
        {
            return false;
        }
        return true;
    }

    private function unprocessableEntityResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
        $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
        return $response;
    }

    private function notFoundResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }
}