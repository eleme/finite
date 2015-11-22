angular.module('helloworld').controller('default', function($scope) {
  // You can load some list data from your API server by $http serivce
  $scope.list = [
    { name: 'one' },
    { name: 'two' },
    { name: 'three' },
    { name: 'four' },
    { name: 'five' },
    { name: 'six' },
    { name: 'seven' },
    { name: 'eight' },
    { name: 'nine' },
    { name: 'ten' },
    { name: 'eleven' },
    { name: 'twelve' }
  ];
});
