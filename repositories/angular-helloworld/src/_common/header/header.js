angular.module('helloworld').directive('header', () => {
  return {
    transclude: true,
    replace: true,
    templateUrl: '/dist/_common/header/header.html',
    link: function() {
      console.log(this);
    }
  };
});

angular.module('helloworld').controller('header', () => {
  console.log(this);
});
