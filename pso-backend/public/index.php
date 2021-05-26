<?php
require "../bootstrap.php";
use Src\Controller\MapFeatureController;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );
$apipart = array_slice($uri, 4);
var_dump($apipart);

// all of our endpoints start with /mapfeature
// everything else results in a 404 Not Found
if (!isset($apipart[0]) || $apipart[0] !== 'mapfeature') {
    echo "nö";
    header("HTTP/1.1 404 Not Found");
    exit();
}

// the user id is, of course, optional and must be a number:
$featuresOfType = null;
if (isset($apipart[1]))
{
    $featuresOfType = (int) $apipart[1];
}

$requestMethod = $_SERVER["REQUEST_METHOD"];

// pass the request method and user ID to the PersonController and process the HTTP request:
$controller = new MapFeatureController($dbConnection, $requestMethod, $featuresOfType);
$controller->processRequest();
?>