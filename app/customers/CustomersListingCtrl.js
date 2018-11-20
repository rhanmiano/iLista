(function(){
  'use strict';

  define([
    'ng-app'
  ], function(app){
    app.controller('CustomersListingCtrl', ['$scope', '$timeout', 'CustomerListingSrvc', function($scope, $timeout, CustomerListingSrvc){      
      $scope.customer = {};
      $scope.actions = {
        add   : false,
        update: false,
        delete: false
      };

      $scope.message = {
        status: "default",
        caption: "Choose an action"     
      };

      $scope.getCustomers = function(){
        $scope.customers = [];
        CustomerListingSrvc.customersAllGet()
        .then(function(response){
          var customers = response.data.customers;        
          angular.forEach(customers, function(value, key){
            $scope.customers.push(value);
          });
        });
      };      

      $scope.addCustomer = function(){        
        $scope.actions.add    = true;
        $scope.actions.update = false;
        $scope.actions.delete = false;

        $scope.message.status  = "default";
        $scope.message.caption = "Add a customer";

        angular.forEach($scope.customers, function(value, key) {
          value.clickable = false;
        });
      };

      $scope.updateCustomer = function(){        
        $scope.actions.update = true;
        $scope.actions.add    = false;
        $scope.actions.delete = false;

        $scope.message.status  = "default";
        $scope.message.caption = "Update a customer";

        angular.forEach($scope.customers, function(value, key) {
          value.clickable = true;
        });
      };

      $scope.deleteCustomer = function(){        
        $scope.actions.delete  = true;
        $scope.actions.add     = false;
        $scope.actions.update  = false;

        $scope.message.status = "default";
        $scope.message.caption = "Delete a customer";

        angular.forEach($scope.customers, function(value, key) {
          value.clickable = false;
        });
      };

      //Used by update screen
      $scope.displayCustomer = function(customer){
        $scope.selectedCustomer = {};
        if($scope.actions.update){
          $scope.selectedCustomer = angular.copy(customer);
        }
      }

      $scope.submitAddCustomer = function(customer){
        var data = angular.toJson(customer);
        CustomerListingSrvc.customerAdd(data)
        .then(function (response){
          var data = response.data;
          if(data.status == 'success') {
            $scope.message.status = data.status;        
            $scope.message.caption = data.message;
            $scope.customer = {};
            $scope.getCustomers();
          } else if (data.status == 'failed'){
            $scope.message.status = data.status;
            $scope.message.caption = data.message;
            $scope.customer = {};
          }          
        });
      };

      $scope.submitUpdateCustomer = function(customer){
        if(customer) {
          var data = angular.toJson(customer);
          CustomerListingSrvc.customerUpdate(customer.id, data)
          .then(function (response){
            var data = response.data;

            if(data.status == 'success') {
              $scope.message.status = data.status;
              $scope.message.caption = data.message;
              
              $scope.selectedCustomer = {};  
              $scope.getCustomers();
              
              $timeout(function(){
                angular.forEach($scope.customers, function(value, key) {
                  value.clickable = true;
                }); 
              }, 800);
               
            } else if (data.status == 'failed'){
              $scope.message.status = data.status;
              $scope.message.caption = data.message;
            } 
          });
        }

              
      };

      $scope.submitDeleteCustomer = function(customerId){
        if(customerId) {
          CustomerListingSrvc.customerDelete(customerId)
          .then(function (response){
            var data = response.data;

            if(data.status == 'success') {
              $scope.message.status = data.status;
              $scope.message.caption = data.message;

              $scope.getCustomers();
            } else if (data.status == 'failed'){
              $scope.message.status = data.status;
              $scope.message.caption = data.message;
            } 
          });
        }
      };

      $scope.checkValue = function(args){
        console.log(args);
      };

      $scope.getCustomers();
    }]);   

    app.service('CustomerListingSrvc', ['$http', function($http, $httpParamSerializerJQLike){
      return {
        'customersAllGet': function(){
          return $http({
            method: 'GET',
            url: '/api/customers',
            headers: {
              'Content-Type': 'application/json'
            }
          });
        },
        'customerAdd': function(data){
          return $http({
            method: 'POST',
            url: '/api/add/customer',
            data: data,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
        },
        'customerUpdate': function(id, data){
          return $http({
            method: 'PUT',
            url: `/api/update/customer/${id}`,
            data: data,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
        },
        'customerDelete': function(id){
          return $http({
            method: 'DELETE',
            url: `/api/delete/customer/${id}`,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
        }
      }      
    }]);
  });
}());