angular.module('cacService')
  .constant('ONE_COUNTRY_PATH', 'countryInfoJSON?country={{ code }}&username=agreenfield')
  .service('countryDetail', ['$q', '$interpolate', 'geoRequest', 'ONE_COUNTRY_PATH',
    function ($q, $interpolate, geoRequest, ONE_COUNTRY_PATH) {

      this.byCode = function (countryCode) {
        var request = $interpolate(ONE_COUNTRY_PATH)({
          code: countryCode
        });

        return geoRequest(request);
      };
    }]);