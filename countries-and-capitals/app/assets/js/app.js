angular.module('cacService',[]);
angular.module('countriesAndCapitals',['cacService','ngRoute'])
    .config(function ($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: './assets/views/home.html'
//        controller: 'HomeCtrl'
      }).when('/countries', {
        templateUrl: './assets/views/countries.html',
        controller: 'CountriesController'
      }).when('/countries/:country/capital', {
        templateUrl: './assets/views/country-detail.html',
        controller: 'DetailController',
        resolve: {
          countryCode: function ($route, $location) {
            var countryCode = $route.current.params.country;
//            if (owmCities.indexOf(city) == -1) {
//              $location.path('/error');
//              return;
//            }
            return countryCode;
          }
        }
      }).when('/error', {
        template: '<p>Error Page Not Found</p>'
      }).when('/detail', {
        templateUrl: './assets/views/country-detail.html',
        controller: 'DetailController'
      }).otherwise({
        redirectTo: '/'
      });

    });

