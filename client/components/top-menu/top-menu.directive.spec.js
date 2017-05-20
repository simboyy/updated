'use strict';

describe('Directive: topMenu', function () {

  // load the directive's module and view
  beforeEach(module('mediaboxApp'));
  beforeEach(module('components/top-menu/top-menu.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<top-menu></top-menu>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the topMenu directive');
  }));
});
