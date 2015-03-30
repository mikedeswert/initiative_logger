angular.module('webTransportModule').service('urlFactory', ['$location', function($location)  {
    function prependSlash(url) {
        return url.indexOf('/') == 0 ? url : '/' + url;
    }

    this.createUrl = function(url) {
        var regexGroups = $location.absUrl().match("(http|https)://[^/]*/(.*)/#.*");
        return '/' + regexGroups[2] + prependSlash(url);
    };

}]);