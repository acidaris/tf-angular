describe("neighbors service", function() {
  var mockGeoRequest;
  var neighbors;
  beforeEach(module("cacService"));

  beforeEach(function() {
    mockGeoRequest = jasmine.createSpy('mockGeoRequest');

    module(function($provide) {
      $provide.value('geoRequest', mockGeoRequest);
    });
  });

  beforeEach(inject(function(_neighbors_) {
    neighbors = _neighbors_;
  }));

  describe("neighbors() function", function() {
    it('geoRequest made on correct url', inject(function() {
      neighbors('123');
      expect(mockGeoRequest).toHaveBeenCalledWith('neighboursJSON?geonameId=123&username=agreenfield');
    }));
  });
});