describe("CountriesController tests", function() {
  beforeEach(module('countriesAndCapitals'));

  var $scope, $location;
  var deferred, countryInfo;
  beforeEach(inject(function($controller, $rootScope, _$location_, $q, _countryInfo_) {
    $scope = $rootScope.$new();
    $location = _$location_;

    deferred = $q.defer();
    countryInfo = _countryInfo_;

    spyOn(countryInfo, 'list').and.returnValue(deferred.promise);

    spyOn($location, 'path');
    $controller('CountriesController', {
      $scope : $scope,
      $location : $location,
      countryInfo : countryInfo
    });
  }));

  describe('nav() function', function() {

    it('changes $location.path', function() {
      $scope.nav('path');
      expect($location.path).toHaveBeenCalledWith('path');
    });

  });

  describe('clickCountry() function', function() {

    it('directs $location.path to country page by countryCode', function() {
      $scope.clickCountry({countryCode:'US'});
      expect($location.path).toHaveBeenCalledWith('/countries/US/capital');
    });

  });

  describe('initialization', function() {

    it('loading true', function() {
      expect($scope.loading).toBe(true);
    });

    it('countryInfo list selected', function() {
      expect(countryInfo.list).toHaveBeenCalled();
    });

    it('list returned populated into .countries.list', function() {
      var list = [
        {list : 'one'}
      ];

      deferred.resolve(list);
      $scope.$apply();

      expect($scope.countries.list).toEqual(list);

    });

    it('loading false after all promises are resolved and timeout finished', inject(function($timeout) {
      deferred.resolve([]);
      $scope.$apply();

      $timeout.flush();

      expect($scope.loading).toBe(false);
    }));

  });
});
