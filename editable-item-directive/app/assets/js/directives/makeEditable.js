angular.module('EditableItem.makeEditable', []).directive('makeEditable', function() {
  return {
    restrict : 'A',
    transclude : true,
    scope:true,
    templateUrl : "./assets/partials/make-editable.html",
    controller : function($scope, $element, $timeout) {

      var editableItem = $element.find('div')[2];

      $scope.editable = false;
      $scope.edit = function() {
        $scope.editable = true;
        $timeout(function() {
          editableItem.focus();
        }, 300);
      };
      $scope.save = function() {
        $scope.editable = false;
      };
    }
  };
});