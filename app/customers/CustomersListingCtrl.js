;(function () {
  'use strict'

  define(['ng-app'], function (app) {
    app.controller('CustomersListingCtrl', [
      '$scope',
      '$timeout',
      'CustomerListingSrvc',
      function ($scope, $timeout, CustomerListingSrvc) {
        $scope.customers = []
        $scope.customer = {}
        $scope.actions = {
          add: false,
          update: false,
          delete: false,
        }

        $scope.message = {
          status: 'default',
          caption: 'Choose an action',
        }

        $scope.page = {
          loading: true,
        }

        $scope.getCustomers = function () {
          CustomerListingSrvc.customersAllGet().then(function (response) {
            var customers = response.data.customers
            angular.forEach(customers, function (value, key) {
              $scope.customers.push(value)
            })
            $scope.page.loading = false
          })
        }

        $scope.addCustomer = function () {
          $scope.actions.add = true
          $scope.actions.update = false
          $scope.actions.delete = false

          $scope.message.status = 'default'
          $scope.message.caption = 'Add a customer'

          angular.forEach($scope.customers, function (value, key) {
            value.clickable = false
          })
        }

        $scope.updateCustomer = function () {
          $scope.selectedCustomer = {}
          $scope.actions.update = true
          $scope.actions.add = false
          $scope.actions.delete = false

          $scope.message.status = 'default'
          $scope.message.caption = 'Choose a customer to be updated'

          angular.forEach($scope.customers, function (value, key) {
            value.clickable = true
          })
        }

        $scope.deleteCustomer = function () {
          $scope.actions.delete = true
          $scope.actions.add = false
          $scope.actions.update = false

          $scope.message.status = 'default'
          $scope.message.caption = 'Choose a customer to be deleted'

          angular.forEach($scope.customers, function (value, key) {
            value.clickable = false
          })
        }

        //Used by update screen
        $scope.displayCustomer = function (customer) {
          if ($scope.actions.update) {
            $scope.selectedCustomer = angular.copy(customer)
          }
        }

        $scope.submitAddCustomer = function (customer) {
          $scope.message.status = 'default'
          $scope.message.caption = 'Waiting for response...'

          if (!angular.equals({}, customer)) {
            var data = angular.toJson(customer)
            CustomerListingSrvc.customerAdd(data).then(function (response) {
              var data = response.data
              if (data.status == 'success') {
                $scope.page.loading = true
                $scope.customers = []
                $scope.message.status = data.status
                $scope.message.caption = data.message
                $scope.customer = {}
                $scope.getCustomers()
              } else if (data.status == 'failed') {
                $scope.message.status = data.status
                $scope.message.caption = data.message
                $scope.customer = {}
                $scope.page.loading = false
              }
            })
          } else {
            $scope.message.status = 'failed'
            $scope.message.caption = 'Required fields must not be empty'
            $scope.page.loading = false
          }
        }

        $scope.submitUpdateCustomer = function (customer) {
          $scope.message.status = 'default'
          $scope.message.caption = 'Waiting for response...'

          if (!angular.equals({}, customer)) {
            var data = angular.toJson(customer)
            $scope.page.loading = true

            CustomerListingSrvc.customerUpdate(customer.id, data).then(
              function (response) {
                var data = response.data

                if (data.status == 'success') {
                  $scope.customers = []
                  $scope.message.status = data.status
                  $scope.message.caption = data.message

                  $scope.selectedCustomer = {}
                  $scope.getCustomers()

                  $timeout(function () {
                    angular.forEach($scope.customers, function (value, key) {
                      value.clickable = true
                    })
                  }, 800)
                } else if (data.status == 'failed') {
                  $scope.message.status = data.status
                  $scope.message.caption = data.message
                  $scope.page.loading = false
                }
              }
            )
          } else {
            $scope.message.status = 'failed'
            $scope.message.caption = 'No selected customer'
            $scope.page.loading = false
          }
        }

        $scope.submitDeleteCustomer = function (customerId) {
          $scope.customers = []
          $scope.page.loading = true
          $scope.message.status = 'default'
          $scope.message.caption = 'Waiting for response...'

          if (customerId) {
            CustomerListingSrvc.customerDelete(customerId).then(function (
              response
            ) {
              var data = response.data

              if (data.status == 'success') {
                $scope.message.status = data.status
                $scope.message.caption = data.message

                $scope.getCustomers()
              } else if (data.status == 'failed') {
                $scope.message.status = data.status
                $scope.message.caption = data.message
              }
            })
          }
        }

        $scope.getCustomers()
      },
    ])

    app.service('CustomerListingSrvc', [
      '$http',
      function ($http, $httpParamSerializerJQLike) {
        var $apiUrl = 'https://slim-customer-listing.herokuapp.com/'

        return {
          customersAllGet: function () {
            return $http({
              method: 'GET',
              url: $apiUrl + '/api/customers',
              headers: {
                'Content-Type': 'application/json',
              },
            })
          },
          customerAdd: function (data) {
            return $http({
              method: 'POST',
              url: $apiUrl + '/api/add/customer',
              data: data,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            })
          },
          customerUpdate: function (id, data) {
            return $http({
              method: 'POST',
              url: $apiUrl + '/api/update/customer/' + id,
              data: data,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            })
          },
          customerDelete: function (id) {
            return $http({
              method: 'POST',
              url: $apiUrl + '/api/delete/customer/' + id,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            })
          },
        }
      },
    ])
  })
})()
