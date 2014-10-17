angular.module('countriesAndCapitals').controller('DetailController',
  ['$scope', 'countryCode', 'countryInfo', 'countryCapital', 'getInfo','neighbors','$location','$timeout',
    function ($scope, countryCode, countryInfo, countryCapital, getInfo, neighbors ,$location, $timeout) {

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
        var elapsedTime = new Date().getTime() - startTime;

        $scope.capitalInfo = data;
        $timeout(function(){
          $scope.loading = false;
        },elapsedTime>500? 1:500-elapsedTime);
      };

      var neighborsSuccess = function (data) {
        $scope.neighbors = data;
      };

      var startTime = new Date().getTime();
      countryInfo.byCode(countryCode).then(countrySuccess);
      $scope.loading = true;

      $scope.nav = function (path) {
        $location.path(path);
      };

    }]);