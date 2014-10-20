describe("HomeController tests", function() {
  beforeEach(module('countriesAndCapitals'));
  describe('nav() function', function() {
    var homeController, $scope, $location;
    beforeEach(inject(function($controller, $rootScope, _$location_) {
      $scope = $rootScope.$new();

      $location = _$location_;

      spyOn($location,'path');

      homeController = $controller('HomeController', {
        $scope : $scope,
        $location : $location
      });
    }));

    it('changes $location.path', function() {
      $scope.nav('path');

      expect($location.path).toHaveBeenCalledWith('path');
    });
  });
});