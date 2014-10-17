angular.module('countriesAndCapitals').controller('DetailController',
  ['$scope', 'countryCode', 'countryInfo', 'countryCapital', 'getInfo','neighbors','$location',
    function ($scope, countryCode, countryInfo, countryCapital, getInfo, neighbors ,$location) {

      var countrySuccess = function (data) {

        $scope.country = data;
        countryCapital(countryCode, data.capital).then(capitalSuccess);
        neighbors(data.geonameId).then(neighborsSuccess);
      };

      var capitalSuccess = function (data) {
        $scope.capital = data;
        getInfo(data.geonameId).then(capitalInfoSuccess);

      };

      var capitalInfoSuccess = function (data) {

        $scope.capitalInfo = data;
        $scope.loading = false;
      };

      var neighborsSuccess = function (data) {
        $scope.neighbors = data;

      };

      countryInfo.byCode(countryCode).then(countrySuccess);
      $scope.loading = true;

      $scope.nav = function (path) {
        $location.path(path);
      };

    }]);