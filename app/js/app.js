(function(){
  'use strict';

  define([
    'angular',
    'angular-route'
  ], function(angular){   

    var app = angular.module('CustomerListingApp', ['ngRoute']);
    
    return app;
  });
}());