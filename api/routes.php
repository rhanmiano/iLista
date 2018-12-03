<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'models/Customers.php';

$app = new \Slim\App();

$app->add(function ($request, $response, $next) {
    $response = $next($request, $response);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST');
});

// Get all customers
$app->get('/api/customers', function (Request $request, Response $response){

  $retval = new CustomersModel(); 
  $retval = $retval->getAllCustomers();

  $response = $response->withStatus(200)
      ->withHeader('Content-type', 'application/json')
      ->withJson($retval);
  return $response;
});

// Get specific customer by id
$app->get('/api/customer/{id}', function(Request $request, Response $response, array $args){
  $id = (int)$args['id'];
  
  $retval = new CustomersModel();
  $retval = $retval->getCustomerById($id);

  $response = $response->withStatus(200)
      ->withHeader('Content-type', 'application/json')
      ->withJson($retval);
  return $response;
});

// Add customer
$app->post('/api/add/customer', function(Request $request, Response $response){
  $body_args = json_decode($request->getBody());
  
  $retval = new CustomersModel();
  $retval = $retval->insertCustomer($body_args);

  $response = $response->withStatus(200)
      ->withHeader('Content-type', 'application/json')
      ->withJson($retval);
  return $response;
});

// Update specific customer by id
$app->post('/api/update/customer/{id}', function(Request $request, Response $response, array $args){
  $id = (int)$args['id'];
  $body_args = json_decode($request->getBody()); 

  $retval = new CustomersModel();
  $retval = $retval->updateCustomerById($id,$body_args);

  $response = $response->withStatus(200)
      ->withHeader('Content-type', 'application/json')
      ->withJson($retval);
  return $response;
});

// Delete specific customer by id
$app->post('/api/delete/customer/{id}', function(Request $request, Response $response, array $args){
  $id = (int)$args['id'];

  $retval = new CustomersModel();
  $retval = $retval->deleteCustomerById($id);

  $response = $response->withStatus(200)
      ->withHeader('Content-type', 'application/json')
      ->withJson($retval);
  return $response;
});

$app->get('/', function (Request $request, Response $response, array $args) {
    return $response->withStatus(302)->withRedirect('app/');
});

