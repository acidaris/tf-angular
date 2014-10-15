angular.module('countriesAndCapitals').controller('DetailController',
    ['$scope','countryCode','countryInfo','countryCapital','getInfo',
      function ($scope,countryCode,countryInfo, countryCapital, getInfo) {

       console.log('countryCode:',countryCode);

        var countrySuccess = function(data) {
          console.log('country',data);
        };


        var capitalSuccess = function(data) {
          console.log('capital', data);

        };

        var capitalInfoSuccess = function(data)
        {
          console.log('capitalInfo', data);

        };

        countryInfo.byCode(countryCode).then(countrySuccess);
        countryCapital('US','Washington').then(capitalSuccess);
        getInfo(4140963).then(capitalInfoSuccess);


        //TODO: Loading state

      }]);