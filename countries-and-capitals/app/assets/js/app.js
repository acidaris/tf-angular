angular.module('cacService', []);
angular.module('countriesAndCapitals', ['cacService', 'ngRoute'])
  .config(['$routeProvider',function ($routeProvider) {
    $routeProvider.when('/', {
      controller: 'HomeController',
      templateUrl: './assets/views/home.html'
    }).when('/countries', {
      templateUrl: './assets/views/countries.html',
      controller: 'CountriesController'
    }).when('/countries/:country/capital', {
      templateUrl: './assets/views/country-detail.html',
      controller: 'DetailController',
      resolve: {
        countryCode:['$route','$location',function ($route) {
          return $route.current.params.country;
        }]
      }
    }).when('/error', {
      template: '<p>Error Page Not Found</p>'
    }).when('/detail', {
      templateUrl: './assets/views/country-detail.html',
      controller: 'DetailController'
    }).otherwise({
      redirectTo: '/'
    });

  }]);

