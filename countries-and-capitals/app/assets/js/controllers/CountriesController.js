angular.module('countriesAndCapitals').controller('CountriesController',
  ['$scope', '$location', 'countryInfo','$timeout',
    function ($scope, $location, countryInfo, $timeout) {

      $scope.countries = {};

      /**
       * Success function for getting country list.
       * @param data
       * @private
       */
      var successfulGet = function (data) {
        $scope.countries.list = data;

        var elapsedTime = new Date().getTime() - startTime;
        $timeout(function () {
          $scope.loading = false;
        }, elapsedTime>500? 1:500-elapsedTime);
      };

      $scope.loading = true;
      var startTime = new Date().getTime();
      countryInfo.list().then(successfulGet);


      /**
       * navigate to the clicked country.
       * @param {object} country
       */
      $scope.clickCountry = function (country) {
        $location.path('/countries/'+country.countryCode+'/capital');
      };

      /**
       * Navigate to provided path
       * @param {string} path
       */
      $scope.nav = function (path) {
              $location.path(path);
      };

    }]);