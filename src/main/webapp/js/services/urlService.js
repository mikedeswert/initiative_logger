angular.module('webTransportModule')
    .factory('urlService', ['$location', function($location) {
        return {
            createUrl: function(url) {
                // TODO modify regex to work without index.html
                var result = $location.absUrl().match("(http|https)://[^/]*/(.*)/index.html");
                var purifiedUrl = url.indexOf('/') == 0 ? url : '/' + url;
                //var purifiedBaseUrl = result[2].replace("#", '');
                return '/' + result[2] + purifiedUrl;
            }
        }
    }]);