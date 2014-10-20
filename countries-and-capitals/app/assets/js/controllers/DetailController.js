angular.module('countriesAndCapitals').controller('DetailController',
    ['$scope', '$q','countryCode', 'countryInfo', 'countryCapital', 'getInfo', 'neighbors', '$location', '$timeout',
      function($scope, $q, countryCode, countryInfo, countryCapital, getInfo, neighbors, $location, $timeout) {

        /**
         * get a country by the 2 character country code.
          * @param countryCode
         * @returns {*} promise
         */
        var getCountry = function(countryCode) {
          return countryInfo.byCode(countryCode).then(function(data) {
                $scope.country = data;
                return data;
              });
        };

        /**
         * get a country's capital city
         * @param country
         * @returns {*} promise
         */
        var getCapitalCity = function(country) {
          return countryCapital(countryCode, country.capital).then(function(data) {
            $scope.capital = data;
            return data;
          });
        };


        /**
         * gets a country's neighbors
         * @param country
         * @returns {*} promise
         */
        var getNeighbors = function(country) {
          return neighbors(country.geonameId)
              .then(function(data) {
                $scope.neighbors = data;
                return data;
              });
        };

        /**
         * Get a capital cities
         * @param responses return value of earlier chained responses [getCapitalCity,getNeighbors]
         * @returns {*}
         */
        var getCapitalInfo = function(responses) {
          return getInfo(responses[0].geonameId).then(capitalInfoSuccess);
        };

        /**
         * Success function for getCapitalInfo.  This is the end of the promise chain, so the
         * loading flag will be cleared here.
         * @param data response from getInfo;
         */
        var capitalInfoSuccess = function(data) {
          var elapsedTime = new Date().getTime() - startTime;
          $scope.capitalInfo = data;
          $timeout(function() {
            $scope.loading = false;
          }, elapsedTime > 500 ? 1 : 500 - elapsedTime);
        };

        $scope.loading = true;
        var startTime = new Date().getTime();

        /**
         * Get all data for the country / capital.
         */
          getCountry(countryCode)
            .then(function(country){
              $q.all([
                getCapitalCity(country),
                getNeighbors(country)
              ]).then(getCapitalInfo);
            });

        /**
         * Nagivate to the supplied path route.
         * @param {string} path
         */
        $scope.nav = function(path) {
          $location.path(path);
        };

      }]);