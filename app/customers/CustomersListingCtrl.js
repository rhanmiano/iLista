(function(){
  'use strict';

  define([
    'ng-app'
  ], function(app){
    app.controller('CustomersListingCtrl', ['$scope', '$rootScope', 'CustomerListingSrvc', function($scope, $rootScope, CustomerListingSrvc){      
      $scope.customer = {};
      $scope.actions = {
        add   : false,
        update: false,
        delete: false
      };
      $scope.message = "Choose an action";
      $scope.getCustomers = function(){
        $scope.customers = [];
        CustomerListingSrvc.customersAllGet()
        .then(function(response){
          var customers = response.data.customers;        
          angular.forEach(customers, function(value, key){
            $scope.customers.push(value);
          })
        });
      };      

      $scope.addCustomer = function(){
        $scope.message        = "Add a customer";
        $scope.actions.add    = true;
        $scope.actions.update = false;
        $scope.actions.delete = false;
      };

      $scope.updateCustomer = function(){
        $scope.message        = "Update a customer";
        $scope.actions.update = true;
        $scope.actions.add    = false;
        $scope.actions.delete = false;
      };

      $scope.deleteCustomer = function(){
        $scope.message        = "Delete a customer";
        $scope.actions.delete = true;
        $scope.actions.add    = false;
        $scope.actions.update = false;
      };

      $scope.saveAddCustomer = function(customer){
        var data = angular.toJson(customer);
        console.log(data);
        CustomerListingSrvc.customerAdd(data)
        .then(function(response){
          var data = response.data;
          if(data.status == 'success') {            
            $scope.message = data.message;
            $scope.customer = {};
            $scope.customers.push(customer);
          } else if (response.data.status == 'failed'){
            $scope.message = data.message;
            $scope.customer = {};
          }          
        });
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
        }
      }
      
    }]);
  });
}());