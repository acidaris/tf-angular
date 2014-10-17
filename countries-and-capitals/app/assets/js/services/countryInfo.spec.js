describe("countryInfo service", function() {
  var mockGeoRequest;
  var countryInfo;
  var deferred;
  var $rootScope;
  beforeEach(module("cacService"));

  beforeEach(function() {
    mockGeoRequest = jasmine.createSpy('mockGeoRequest');

    module(function($provide) {
      $provide.value('geoRequest', mockGeoRequest);
    });
  });

  beforeEach(inject(function(_countryInfo_,_$q_, _$rootScope_) {
    countryInfo = _countryInfo_;
    deferred = _$q_.defer();
    $rootScope = _$rootScope_;

    mockGeoRequest.and.returnValue(deferred.promise);

  }));

  describe("list() function", function() {
    it('geoRequest made on correct url', inject(function() {
      countryInfo.list();

      deferred.resolve({geonames:[]});
      $rootScope.$apply();

      expect(mockGeoRequest).toHaveBeenCalledWith('countryInfoJSON?username=agreenfield');

    }));

    it('list only requested once', inject(function() {
      countryInfo.list();

      deferred.resolve({geonames : []});
      $rootScope.$apply();

      expect(mockGeoRequest).toHaveBeenCalled();

      mockGeoRequest.calls.reset();

      countryInfo.list();
      expect(mockGeoRequest).not.toHaveBeenCalled();

    }));

    it('geoRequest reject rejects promise', function() {
      var rejectFunction = jasmine.createSpy('rejectFunction');

      countryInfo.list().catch(rejectFunction);
      deferred.reject({message:'error'});
      $rootScope.$apply();

      expect(rejectFunction).toHaveBeenCalledWith({message : 'error'});

    });

    it('geoRequest resolve resolves promise', function() {
      var resolveFunction = jasmine.createSpy('resolveFunction');

      countryInfo.list().then(resolveFunction);
      deferred.resolve({geonames :[]});
      $rootScope.$apply();

      expect(resolveFunction).toHaveBeenCalledWith([]);
    });

    it('list cached', inject(function() {
      countryInfo.list();

      deferred.resolve({geonames : [{first:'list'}]});
      $rootScope.$apply();

      var resolveFunction = jasmine.createSpy('resolveFunction');
      debugger;
      countryInfo.list().then(resolveFunction);
      $rootScope.$apply();

      expect(resolveFunction).toHaveBeenCalledWith([{first : 'list'}]);

    }));
  });

  describe('byCode() function', function() {
    it('geoRequest made on correct url', inject(function() {
      countryInfo.byCode('US');

      deferred.resolve({geonames : [{first:'entry'}]});
      $rootScope.$apply();

      expect(mockGeoRequest).toHaveBeenCalledWith('countryInfoJSON?country=US&username=agreenfield');
    }));

    it('geoRequest resolve returns first entry', function() {
      var resolveFunction = jasmine.createSpy('resolveFunction');

      countryInfo.byCode('US').then(resolveFunction);
      deferred.resolve({geonames : [
        {first : 'entry'},
        {second : 'entry'}
      ]});

      $rootScope.$apply();

      expect(resolveFunction).toHaveBeenCalledWith({first : 'entry'});
    });

    it('geoRequest reject rejects promise', function() {
      var rejectFunction = jasmine.createSpy('rejectFunction');

      countryInfo.byCode('US').catch(rejectFunction);
      deferred.reject({message : 'error'});
      $rootScope.$apply();

      expect(rejectFunction).toHaveBeenCalledWith({message : 'error'});

    });

  });
});