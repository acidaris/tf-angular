describe("DetailController tests", function() {
  var $scope, $location;
  var countryDeferred, countryInfo;
  var capitalDeferred, countryCapital;
  var neighborsDeffered, neighbors;
  var capitalInfoDeferred, getInfo;

  beforeEach(module('countriesAndCapitals'));

  beforeEach(inject(function($rootScope, _$location_, $q, _countryInfo_) {
    $scope = $rootScope.$new();
    $location = _$location_;

    countryDeferred = $q.defer();
    countryInfo = _countryInfo_;

    spyOn(countryInfo, 'byCode').and.returnValue(countryDeferred.promise);
    spyOn($location, 'path');

  }));

  beforeEach(inject(function( $q) {

    capitalDeferred = $q.defer();
    countryCapital = jasmine.createSpy('countryCapital');

    countryCapital.and.returnValue(capitalDeferred.promise);
  }));

  beforeEach(inject(function($q) {

    neighborsDeffered = $q.defer();
    neighbors = jasmine.createSpy('neighbors');

    neighbors.and.returnValue(neighborsDeffered.promise);
  }));

  beforeEach(inject(function($q) {

    capitalInfoDeferred = $q.defer();
    getInfo = jasmine.createSpy('getInfo');

    getInfo.and.returnValue(capitalInfoDeferred.promise);
  }));


  beforeEach(inject(function($controller) {
    $controller('DetailController', {
      $scope : $scope,
      $location : $location,
      countryInfo : countryInfo,
      countryCapital: countryCapital,
      neighbors: neighbors,
      getInfo: getInfo,
      countryCode : 'US'
    });
  }));

  describe('nav() function', function() {
    it('changes $location.path', function() {
      $scope.nav('path');

      expect($location.path).toHaveBeenCalledWith('path');
    });
  });

  describe('initialization', function() {
    it('countryInfo.getCountry called', function() {
      expect(countryInfo.byCode).toHaveBeenCalledWith('US');
    });

    it('country populated with value resolved by countryInfo', function() {
      var country = {geonameId : '123'};

      countryDeferred.resolve(country);
      $scope.$apply();

      expect($scope.country).toEqual(country);

    });

    it('country info used to select neighbors', function() {
      countryDeferred.resolve({geonameId:'123'});
      $scope.$apply();

      expect(neighbors).toHaveBeenCalledWith('123');

    });

    it('capital city selected with country info', function() {
      countryDeferred.resolve({capital : 'Washington'});
      $scope.$apply();

      expect(countryCapital).toHaveBeenCalledWith('US','Washington');
    });

    it('capital populated with resolved countryCapital', function() {

      var capital = {geonameId : '124'};

      countryDeferred.resolve({});
      capitalDeferred.resolve(capital);
      $scope.$apply();

      expect($scope.capital).toEqual(capital);

    });

    it('capital populated with resolved countryCapital', function() {

      var neighbors = [{geonameId : '124'}];

      countryDeferred.resolve({});
      neighborsDeffered.resolve(neighbors);
      $scope.$apply();

      expect($scope.neighbors).toEqual(neighbors);

    });


    it('neighbors and capital city resolved required to get capital info', function() {
      countryDeferred.resolve({});
      capitalDeferred.resolve({geonameId:'124'});
      neighborsDeffered.resolve({});
      $scope.$apply();

      expect(getInfo).toHaveBeenCalledWith('124');
    });

    it('capital info populated with resolved getInfo', function() {
      countryDeferred.resolve({});
      capitalDeferred.resolve({});
      neighborsDeffered.resolve({});

      var capitalInfo = {'capitalInfo':'info'};

      capitalInfoDeferred.resolve(capitalInfo);
      $scope.$apply();

      expect($scope.capitalInfo).toEqual(capitalInfo);
    });

    it('loading false after all promises are resolved and timeout finished', inject(function($timeout) {
      countryDeferred.resolve({});
      capitalDeferred.resolve({});
      neighborsDeffered.resolve({});
      capitalInfoDeferred.resolve({});

      $scope.$apply();
      $timeout.flush();

      expect($scope.loading).toBe(false);
    }));
  });
});