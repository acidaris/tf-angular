angular.module('countriesAndCapitals')
    .controller('TestController', ['$scope', 'neighbors', function ($scope, neighbors) {
      $scope.testUrl = function () {
        neighbors(6252001);
      };
    }]);