<?php

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');

$options = [
    PDO::ATTR_PERSISTENT => true,  
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION  
];

try {
  $dbcon = new PDO('mysql:host=' . DB_HOST, DB_USER, DB_PASS, $options);
  $sql = file_get_contents('data/init.sql', FILE_USE_INCLUDE_PATH);
  $dbcon->exec($sql);
  
  echo 'iLista database initialization completed!' . "\n";
} catch(PDOException $error) {
  echo $sql . $error->getMessage() . "\n";
}