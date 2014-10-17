describe("countryCapital service", function() {
  var mockGeoRequest;
  var countryCapital;
  var deferred;
  var $rootScope;


  beforeEach(module("cacService"));

  beforeEach(function() {
    mockGeoRequest = jasmine.createSpy('mockGeoRequest');

    module(function($provide) {
      $provide.value('geoRequest', mockGeoRequest);
    });
  });

  beforeEach(inject(function(_countryCapital_, _$q_, _$rootScope_) {
    countryCapital = _countryCapital_;
    deferred = _$q_.defer();
    $rootScope = _$rootScope_;

    mockGeoRequest.andReturn(deferred.promise);
  }));

  describe("countryCapital() function", function() {
    it('geoRequest made on correct url', inject(function() {
      countryCapital('US','Washington');

      deferred.resolve({geonames : [
        {first : 'entry'}
      ]});
      $rootScope.$apply();

      expect(mockGeoRequest).toHaveBeenCalledWith('searchJSON?name=Washington&country=US&maxRows=10&featureCode=PPLC&username=agreenfield');
    }));
  });
});