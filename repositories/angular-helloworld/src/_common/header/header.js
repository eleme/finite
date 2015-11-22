angular.module('helloworld').directive('header', () => {
  return {
    transclude: true,
    replace: true,
    templateUrl: '/dist/_common/header/header.html'
  };
});

angular.module('helloworld').controller('header', () => {
  // TODO
});
