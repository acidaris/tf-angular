angular.module('EditableItem.makeEditable',[]).directive('makeEditable',function(){
  return {
    restrict:'A',
    transclude:true,
    templateUrl:"./assets/partials/make-editable.html"
  };
})