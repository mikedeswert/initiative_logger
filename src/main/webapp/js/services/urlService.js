angular.module('webTransportModule')
    .factory('urlService', ['$location', function($location) {
        function prependSlash(url) {
            return url.indexOf('/') == 0 ? url : '/' + url;
        }

        return {
            createUrl: function(url) {
                // TODO modify regex to work without index.html
                var result = $location.absUrl().match("(http|https)://[^/]*/(.*)/index.html");
                var purifiedUrl = prependSlash(url);
                return '/' + result[2] + purifiedUrl;
            }
        }
    }]);