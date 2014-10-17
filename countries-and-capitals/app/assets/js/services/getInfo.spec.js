describe("getInfo service", function() {
  var mockGeoRequest;
  var getInfo;
  beforeEach(module("cacService"));

  beforeEach(function() {
    mockGeoRequest = jasmine.createSpy('mockGeoRequest');

    module(function($provide) {
      $provide.value('geoRequest', mockGeoRequest);
    });
  });

  beforeEach(inject(function(_getInfo_) {
    getInfo = _getInfo_;
  }));

  describe("getInfo() function", function() {
    it('geoRequest made on correct url', inject(function() {
      getInfo('123');
      expect(mockGeoRequest).toHaveBeenCalledWith('getJSON?geonameId=123&username=agreenfield');
    }));
  });
});