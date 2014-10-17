angular.module('cacService')
  .constant('NEIGHBORS_PATH', 'neighboursJSON?geonameId={{ id }}&username=agreenfield')
  .factory('neighbors', ['$interpolate', 'NEIGHBORS_PATH', 'geoRequest',
    function ($interpolate, NEIGHBORS_PATH, geoRequest) {
      return function (geonameId) {
        var request = $interpolate(NEIGHBORS_PATH)({
          id: geonameId
        });
        return geoRequest(request);
      };
    }]);