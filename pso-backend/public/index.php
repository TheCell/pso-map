<?php
require "../bootstrap.php";
use Src\Controller\MapFeatureController;
use Src\Controller\FeatureTypeController;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

$apipart = array_slice($uri, 4);

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Authorization, Content-Type,Accept, Origin");
exit(0);
}

if (!isset($apipart[0]))
{
    header("HTTP/1.1 404 Not Found");
    exit();
}

switch($apipart[0])
{
    case 'mapfeature': 
        $featureTypeId = null;
        if (isset($apipart[1]))
        {
            $featureTypeId = (int) $apipart[1];
        }

        $requestMethod = $_SERVER["REQUEST_METHOD"];

        $controller = new MapFeatureController($dbConnection, $requestMethod, $featureTypeId);
        $controller->processRequest();
        break;
    case 'featuretype':
        $featureTypeId = null;
        if (isset($apipart[1]))
        {
            $featureTypeId = (int) $apipart[1];
        }

        $requestMethod = $_SERVER["REQUEST_METHOD"];

        $controller = new FeatureTypeController($dbConnection, $requestMethod, $featureTypeId);
        $controller->processRequest();
        break;
    default:
        header("HTTP/1.1 404 Not Found");
        exit();
}