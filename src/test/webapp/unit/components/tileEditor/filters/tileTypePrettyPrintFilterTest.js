"use strict";

describe('tileTypePrettyPrintFilter', function () {
    var $filter;

    beforeEach(function () {
        module('tileEditor');

        inject(function (_$filter_) {
            $filter = _$filter_;
        })
    });


    it('should return a pretty version of AAA_BBB format of a tile type', function () {
        var actual = $filter('tileTypePrettyPrint')('WALL_CORNER');

        expect(actual).toBe('Wall Corner');
    });


});