angular.module('countriesAndCapitals')
  .controller('TestController', ['$scope', 'neighbors', 'countryInfo',
    function ($scope, neighbors, countryInfo) {
      $scope.testUrl = function () {
        neighbors(6252001);
      };

      $scope.testUrl2 = function () {
        countryInfo.list();
      };

      $scope.testUrl3 = function () {
        countryInfo.byCode('US');
      };
    }]);