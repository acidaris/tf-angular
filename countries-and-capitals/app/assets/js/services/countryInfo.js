angular.module('cacService')
  .constant('ALL_COUNTRIES_PATH', 'countryInfoJSON?username=agreenfield')
  .constant('ONE_COUNTRY_PATH', 'countryInfoJSON?country={{ code }}&username=agreenfield')
  .service('countryInfo', ['$q', '$interpolate', 'geoRequest', 'ALL_COUNTRIES_PATH', 'ONE_COUNTRY_PATH',
    function ($q, $interpolate, geoRequest, ALL_COUNTRIES_PATH, ONE_COUNTRY_PATH) {

      var countryList;

      this.list = function () {
        var defer = $q.defer();

        if (!countryList) {
          geoRequest(ALL_COUNTRIES_PATH).then(function (data) {
            countryList = data.geonames;
            defer.resolve(countryList);
          }, function (data) {
            defer.reject(data);
          });
        } else {
          defer.resolve(countryList);
        }

        return defer.promise;
      };

      this.byCode = function (countryCode) {
        var request = $interpolate(ONE_COUNTRY_PATH)({
          code: countryCode
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