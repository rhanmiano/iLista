window.DEBUG = true;

requirejs.config({
  baseUrl: '',
  paths: {
    //vendor
    'jquery': 'app/js/lib/jquery-3.3.1.min',
    'bootstrap': 'app/js/lib/bootstrap.min',
    'domReady': 'app/js/lib/dom-ready',
    //angular
    'angular': 'app/js/lib/angular',
    'angular-route': 'app/js/lib/angular-route',

    'ng-app': 'app/js/app'
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
  deps: ['app/js/app-bootstrap']
});