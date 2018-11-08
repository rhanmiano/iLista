<?php
class ReturnObj {
  public $obj;

  public function __construct(){
    $this->obj = new stdClass();
  }

  public function returnObj(){
    return $this->obj;
  }
}
