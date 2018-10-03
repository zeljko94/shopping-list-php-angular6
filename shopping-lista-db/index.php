<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: *');

header("Access-Control-Allow-Headers: *");


include 'DB.php';
require 'Slim/Slim.php';



\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();



require_once 'models/User.php';
require_once 'models/Namirnica.php';
require_once 'models/ShoppingListItem.php';
require_once 'models/ShoppingList.php';


$app->run();


