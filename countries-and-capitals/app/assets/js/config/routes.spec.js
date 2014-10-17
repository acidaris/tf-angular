describe("routes config", function() {
  beforeEach(module("countriesAndCapitals"));

  describe("/ route", function() {
    beforeEach(module("./assets/views/home.html"));

    it('should load the template, controller and call the resolve', inject(function($location, $rootScope, $httpBackend, $route) {

      $rootScope.$apply(function() {
        $location.path('/');
      });

      expect($route.current.controller).toBe('HomeController');
      expect($route.current.loadedTemplateUrl).toBe('./assets/views/home.html');

    }));
  });
});