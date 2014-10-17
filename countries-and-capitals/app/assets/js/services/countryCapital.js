angular.module('cacService')
  .constant('SEARCH_PATH', 'searchJSON?name={{ capital }}&country={{ code }}&maxRows=10&featureCode=PPLC&username=agreenfield')
  .factory('countryCapital', ['$q', '$interpolate', 'geoRequest', 'SEARCH_PATH',
    function ($q, $interpolate, geoRequest, SEARCH_PATH) {
      return function (countryCode, capitalName) {
        var request = $interpolate(SEARCH_PATH)({
          code: countryCode,
          capital: capitalName
        });

        var defer = $q.defer();

        geoRequest(request).then(function (data) {
          defer.resolve(data.geonames[0]);
        }, function (data) {
          defer.reject(data);
        });

        return defer.promise;

      };
    }]);