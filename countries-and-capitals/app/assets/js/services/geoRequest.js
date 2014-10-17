angular.module('cacService')
  .constant('GEO_PREFIX', 'http://api.geonames.org/')
  .factory('geoRequest', ['$http', '$q', 'GEO_PREFIX',
    function ($http, $q, GEO_PREFIX) {
      return function (path) {
        var defer = $q.defer();
        $http.get(GEO_PREFIX + path)
          .success(function (data) {
            defer.resolve(data);
          }).error(function () {
            defer.reject();
          });

        return defer.promise;
      };
    }]);