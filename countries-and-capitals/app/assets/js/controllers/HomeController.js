angular.module('countriesAndCapitals').controller('HomeController',
  ['$scope', '$location',
    function ($scope,$location) {

      $scope.nav = function (path) {
        $location.path(path);
      };

    }]);