angular.module('countriesAndCapitals').controller('CountriesController',
            ['$scope', 'countryInfo',
    function ($scope, countryInfo) {

      $scope.countries = {};
      var successfulGet = function (data) {
        $scope.countries.list = data;
      };

      countryInfo.list().then(successfulGet);

      //TODO: Loading state

    }]);