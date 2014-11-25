angular.module('webTransportModule').service('urlFactory', ['$location', function($location)  {
    function prependSlash(url) {
        return url.indexOf('/') == 0 ? url : '/' + url;
    }

    this.createUrl= function(url) {
        var result = $location.absUrl().match("(http|https)://[^/]*/(.*)/index.html");
        var purifiedUrl = prependSlash(url);
        return '/' + result[2] + purifiedUrl;
    };

}]);