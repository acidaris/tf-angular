angular.module('SimpleSignup.optIn',[]).directive('optIn',function(){
  return {
    restrict:'E',
    transclude:true,
    templateUrl:"./assets/partials/opt-in.html"
  };
})