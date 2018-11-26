(function(){
  'use strict';

  define([
    'ng-app',
    'customers/CustomersListingCtrl'
  ],
  function(app){   

    require(['domReady!'], function(){
      angular.bootstrap(document, ['CustomerListingApp'])
    });
  })
}());