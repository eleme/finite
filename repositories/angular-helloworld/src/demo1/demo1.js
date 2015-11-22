angular.module('helloworld').controller('demo1', function($scope, $routeParams) {
  $scope.name = $routeParams.name;
});
