describe("geoRequest service", function() {
  var geoRequest;
  beforeEach(module("cacService"));

  beforeEach(inject(function(_geoRequest_) {
    geoRequest = _geoRequest_;
  }));

  describe("geoRequest() function", function() {
    it('request made to concatinated url', inject(function($httpBackend) {

      $httpBackend.expectGET('http://api.geonames.org/123').respond(200);
      geoRequest('123');

      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingRequest();
    }));

    it('promise resolved with successful message', inject(function($httpBackend) {

      $httpBackend.expectGET('http://api.geonames.org/123').respond({data:'response'});
      var successFunction = jasmine.createSpy('successFunction');
      geoRequest('123').then(successFunction);

      $httpBackend.flush();

      expect(successFunction).toHaveBeenCalledWith({data:'response'});

    }));

    it('promise rejected with error message', inject(function($httpBackend) {

      $httpBackend.expectGET('http://api.geonames.org/123').respond(400,{data:'error'});
      var errorFunction = jasmine.createSpy('errorFunction');
      geoRequest('123').then(null, errorFunction);

      $httpBackend.flush();

      expect(errorFunction).toHaveBeenCalledWith({data : 'error'});

    }));
  });
});