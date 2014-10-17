describe("helloService", function() {
  beforeEach(module('HelloModule'));

  beforeEach(function() {
    module(function($provide) {
      $provide.value('uppercaseService', function(value) {
        return value;
      });
    });
  });

  it('should return "hello" when called', inject(function(helloService) {
    expect(helloService()).toBe("hello");
  }));
});