window.DEBUG = true;

requirejs.config({
  baseUrl: '',
  paths: {
    //vendor
    'jquery': 'js/lib/jquery-3.3.1.min',
    'bootstrap': 'js/lib/bootstrap.min',
    'domReady': 'js/lib/dom-ready',
    //angular
    'angular': 'js/lib/angular',
    'angular-route': 'js/lib/angular-route',

    'ng-app': 'js/app'
  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    'angular-route': {
      deps: ['angular']
    },
    'jquery': {
      exports: '$'
    },
    'bootstrap': {
      deps: ['jquery'],
      exports: 'bootstrap'
    }
  },
  deps: ['js/app-bootstrap']
});