describe('optIn directive tests', function () {

  var $scope, element, elementScope;

  beforeEach(module('SimpleSignup.optIn'));
  beforeEach(module('./assets/partials/opt-in.html'));

  beforeEach(inject(function (_$rootScope_, $compile) {
    $scope = _$rootScope_.$new();

    element = $compile('<opt-in><div class="image">Content</div></opt-in>')($scope);
    $scope.$digest();

    elementScope = element.scope();

  }));

  it('content transcluded', function () {
    expect(element.find('.opt-in div.optional-content .image').length).toEqual(1);
  });

  it('form displayed', function () {
    expect(element.find('.opt-in div.form-content form').length).toEqual(1);
  });

  it('firstname displayed', function () {
    expect(element.find('.opt-in div.form-content form input[name="firstName"]').length).toEqual(1);
  });

  it('lastName displayed', function () {
    expect(element.find('.opt-in div.form-content form input[name="lastName"]').length).toEqual(1);
  });

  it('email displayed', function () {
    expect(element.find('.opt-in div.form-content form input[name="email"]').length).toEqual(1);
  });

  it('submit displayed', function () {
    expect(element.find('.opt-in div.form-content form button[type="submit"]').length).toEqual(1);
  });
});