angular.module('HelloModule', [])
    .factory('uppercaseService', function() {
      return function(value) {
        return value.toUpperCase();
      }
    })
    .factory('helloService', function(uppercaseService) {
      return function() {
        return uppercaseService('hello');
      }
    });