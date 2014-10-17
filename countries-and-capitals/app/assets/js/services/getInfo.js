angular.module('cacService')
  .constant('GET_PATH', 'getJSON?geonameId={{ geonameId }}&username=agreenfield')
  .factory('getInfo', ['$interpolate', 'geoRequest', 'GET_PATH',
    function ($interpolate, geoRequest, GET_PATH) {
      return function (geonameId) {
        var request = $interpolate(GET_PATH)({
          geonameId: geonameId
        });

        return geoRequest(request);
      };
    }]);
