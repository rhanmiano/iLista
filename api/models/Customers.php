<?php
require_once '/../connection.php';
require '/../includes/global.php';

class Customers extends Model {
  
}

class CustomersModel extends Model{
  protected $data;

  public function __construct(){
    $this->data = new ReturnObj();
  }

  public function getAllCustomers(){
    $data = $this->data->returnObj();

    $customers = Model::factory('Customers')
      ->find_array();

    if(!empty($customers)){
      $data->status    = "success";
      $data->customers = $customers;
      $data->message   = "Fetched data successfully";
    } else {
      $data->status    = "failed";
      $data->customers = null;
      $data->message   = "Nothing to be fetched";
    }

    return $data;
  }

  public function getCustomerById($id){
    $data = $this->data->returnObj();

    $customer = Model::factory('Customers')
      ->where('id', $id)
      ->find_array();

    if(!empty($customer)){
      $data->status   = "success";
      $data->customer = $customer;
      $data->message  = "Fetched data successfully";
    } else {
      $data->status   = "failed";
      $data->customer = $customer;
      $data->message  = "Nothing to be fetched";
    }

    return $data;
  }

  public function insertCustomer($args){
    $data = $this->data->returnObj();

    $customer = Model::factory('Customers')
      ->create();

    if(!empty($args->name) && !empty($args->email) && !empty($args->age)) {
      $customer->name     = $args->name;
      $customer->email    = $args->email;
      $customer->age      = $args->age;

      if($customer->save()){
        $data->status  = "success";
        $data->data    = null;
        $data->message = "Customer added successfully";
      }
    } else {
      $data->status  = "failed";
      $data->data    = null;
      $data->message = "Required fields must not be empty";
    }

    return $data;
  }

  public function updateCustomerById($id, $args){
    $data = $this->data->returnObj();

    $customer = Model::factory('Customers')
      ->find_one($id);    

    $customer_data = Model::factory('Customers')
      ->where('id', $id)
      ->find_array();

    // Columns to be updated
    $columns = array_keys($customer_data[0]);
    $updated_columns = [];
    foreach($columns as $column){
      if($customer->$column != $args->$column) {        
        $customer->$column = $args->$column;
        array_push($updated_columns, $column);
      }      
    }
    
    $customer->set_expr('updated_at', 'now()');

    if (sizeof($updated_columns) > 0) {
      if($customer->save()){
        $data->status          = "success";
        $data->columns_updated = $updated_columns;
        $data->message         = "Customer updated successfully";      
      } else {
        $data->status  = "failed";
        $data->data    = null;
        $data->message = "Cannot do update due to some error";
      }
    } else {
      $data->status          = "failed";
      $data->columns_updated = $updated_columns;
      $data->message         = "No changes have been made";
    }
    
    return $data;
  }

  public function deleteCustomerById($id){
    $data = $this->data->returnObj();

    $customer = Model::factory('Customers')
      ->find_one($id);

    if($customer->delete()){
      $data->status  = "success";
      $data->data    = null;
      $data->message = "Customer deleted successfully";
    } else {
      $data->status  = "failed";
      $data->data    = null;
      $data->message = "Cannot do delete due to some error";
    }

    return $data;
  }
}