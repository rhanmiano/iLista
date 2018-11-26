<?php
require_once 'includes/idiorm.php';
require_once 'includes/paris.php';

ORM::configure('mysql:host=localhost; dbname=ilista');
ORM::configure('username', 'root');
ORM::configure('password', '');
ORM::configure('return_result_sets', false);
ORM::configure('error_mode', PDO::ERRMODE_WARNING);