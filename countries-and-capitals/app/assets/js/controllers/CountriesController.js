angular.module('countriesAndCapitals').controller('CountriesController',
  ['$scope', '$location', 'countryInfo',
    function ($scope, $location, countryInfo) {

      $scope.countries = {};
      var successfulGet = function (data) {
        $scope.countries.list = data;
      };

      countryInfo.list().then(successfulGet);

      //TODO: Loading state

      $scope.clickCountry = function (country) {
        $location.path('/countries/'+country.countryCode+'/capital');
      };

      $scope.nav = function (path) {
              $location.path(path);
            };

    }]);