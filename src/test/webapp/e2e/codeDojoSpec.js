'use strict';

describe('Home page', function () {

    var ptor;

    beforeEach(function () {
        ptor = protractor.getInstance();
        browser.get('/initiative_roller/index.html');
    });

    it('should do something', function () {
        var elem = element(by.id('initiativesLink'));
        expect(ptor.isElementPresent(elem)).toBe(true);
    });

});