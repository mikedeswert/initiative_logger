"use strict";

angular.module("tileEditor").filter("tileTypePrettyPrint", [function () {
    function prettyPrintWords(words) {
        var prettyWords = '';

        for(var i = 0; i < words.length; i++) {
            prettyWords += prettyPrintWord(words[i]);

            if(i < (words.length - 1)) {
                prettyWords += ' ';
            }
        }

        return prettyWords;
    }

    function prettyPrintWord(word) {
        return word.substr(0, 1) + word.substr(1, word.length).toLowerCase();
    }

    return function (tileType) {
        return prettyPrintWords(tileType.split('_'));
    }
}]);