<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require __DIR__ . '/config.php';

$app = new \Slim\App($config);

require 'api/routes.php';

$app->run();