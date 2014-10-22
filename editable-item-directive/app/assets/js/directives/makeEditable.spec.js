describe('makeEditable directive tests',function(){

  var $scope, element;

  beforeEach(module('EditableItem.makeEditable'));
  beforeEach(module('./assets/partials/make-editable.html'));

  beforeEach(inject(function(_$rootScope_, $compile) {
    $scope = _$rootScope_.$new();

    element = $compile('<div make-editable><p>Edit this</p></div>')($scope);
    $scope.$digest();

  }));

  it('content transcluded into correct location', function() {
    debugger;
      expect(element.find('div.content p').text()).toEqual('Edit this');
  });
});