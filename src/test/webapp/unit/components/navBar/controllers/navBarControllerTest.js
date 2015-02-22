"use strict";

describe('NavBarController', function () {
    var scope;

    beforeEach(function () {
        module('navBar');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();

            $controller('NavBarController', {
                $scope: scope
            });
        })
    });

    it('should set isCollapsed to true by default', function () {
        var actual = scope.isCollapsed;

        expect(actual).toBe(true);
    });
});