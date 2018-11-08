(function(){
  'use strict';

  define([
    'ng-app',
    'app/customers/CustomersListingCtrl'
  ],
  function(app){   

    require(['domReady!'], function(){
      angular.bootstrap(document, ['CustomerListingApp'])
    });
  })
}());