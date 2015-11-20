angular.module('helloworld', [
  'ngRoute'
]);

angular.module('helloworld').config(function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode({ enabled: true, requireBase: false });
  $routeProvider.when('/', { templateUrl: '/dist/default/default.html' });
  $routeProvider.when('/demo1', { templateUrl: '/dist/demo1/demo1.html' });
});

angular.module('helloworld').run(($rootScope) => {
  $rootScope.title = 'Hello World';
});
