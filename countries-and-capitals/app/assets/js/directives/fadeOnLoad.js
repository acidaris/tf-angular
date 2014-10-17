angular.module('countriesAndCapitals').directive('fadeOnLoad', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.bind('load', function () {
        element.addClass('loaded');
      });
      attrs.$observe('ngSrc', function () {
        element.removeClass('loaded');
      });
    }
  };
});