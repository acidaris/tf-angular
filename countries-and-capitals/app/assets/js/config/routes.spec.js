describe('routes config', function() {
  beforeEach(module('countriesAndCapitals'));

  describe("/ route", function() {
    beforeEach(module('./assets/views/home.html'));

    it('should load the template, controller and call the resolve', inject(function($location, $rootScope, $httpBackend, $route) {

      $rootScope.$apply(function() {
        $location.path('/');
      });

      expect($route.current.controller).toBe('HomeController');
      expect($route.current.loadedTemplateUrl).toBe('./assets/views/home.html');

    }));
  });

  describe('/countries route', function() {
    beforeEach(module('./assets/views/countries.html'));

    it('should load the template, controller and call the resolve', inject(function($location, $rootScope, $httpBackend, $route) {

      $rootScope.$apply(function() {
        $location.path('/countries');
      });

      expect($route.current.controller).toBe('CountriesController');
      expect($route.current.loadedTemplateUrl).toBe('./assets/views/countries.html');

    }));
  });

  describe('/countries/:countryCode/capital route', function() {
    beforeEach(module('./assets/views/country-detail.html'));

    it('should load the template, controller and call the resolve', inject(function($location, $rootScope, $httpBackend, $route) {

      $rootScope.$apply(function() {
        $location.path('/countries/US/capital');
      });

      expect($route.current.controller).toBe('DetailController');
      expect($route.current.loadedTemplateUrl).toBe('./assets/views/country-detail.html');

    }));
  });
});