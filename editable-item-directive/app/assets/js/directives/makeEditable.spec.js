describe('makeEditable directive tests', function () {

  var $scope, element, elementScope;

  beforeEach(module('EditableItem.makeEditable'));
  beforeEach(module('./assets/partials/make-editable.html'));

  beforeEach(inject(function (_$rootScope_, $compile) {
    $scope = _$rootScope_.$new();

    element = $compile('<div make-editable><p>Edit this</p></div>')($scope);
    $scope.$digest();

    elementScope = element.scope();

  }));

  it('content transcluded into correct location', function () {
    expect(element.find('div.content p').text()).toEqual('Edit this');
  });

  it('button displayed is edit button', function () {
    expect(element.find('div.controls button').text()).toEqual('Edit');
  });

  it('only one button displayed', function () {
    expect(element.find('div.controls button').length).toEqual(1);
  });

  it('content not editable', function () {
    expect(element.find('div.content').eq(0).attr('contenteditable')).toEqual('false');
  });

  it('does not have editable class', function () {
    expect(element.find('div.content').eq(0).attr('class')).toEqual('content');
  });

  describe('edit() function', function () {
    it('shows save button', function () {
      elementScope.edit();
      $scope.$digest();

      expect(element.find('div.controls button').length).toEqual(1);
      expect(element.find('div.controls button').text()).toEqual('Save');
    });

    it('sets contenteditable on content', function () {
      elementScope.edit();
      $scope.$digest();

      expect(element.find('div.content').eq(0).attr('contenteditable')).toEqual('true');
    });

    it('applies editable class', function () {
      elementScope.edit();
      $scope.$digest();

      expect(element.find('div.content').eq(0).attr('class')).toEqual('content editable');
    });
  });

  describe('save() function', function () {
    it('shows edit button', function () {
      elementScope.edit();
      $scope.$digest();

      expect(element.find('div.controls button').text()).toEqual('Save');

      elementScope.save();
      $scope.$digest();

      expect(element.find('div.controls button').text()).toEqual('Edit');

    });

    it('sets contenteditable false on content', function () {
      elementScope.edit();
      $scope.$digest();

      expect(element.find('div.content').eq(0).attr('contenteditable')).toEqual('true');

      elementScope.save();
      $scope.$digest();

      expect(element.find('div.content').eq(0).attr('contenteditable')).toEqual('false');

    });

    it('removed editable class', function () {
      elementScope.edit();
      $scope.$digest();

      expect(element.find('div.content').eq(0).attr('class')).toEqual('content editable');

      elementScope.save();
      $scope.$digest();

      expect(element.find('div.content').eq(0).attr('class')).toEqual('content');

    });
  });
});