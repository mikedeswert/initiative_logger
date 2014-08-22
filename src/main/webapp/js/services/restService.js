angular.module('restModule')
    .factory('restService', ['$http', '$location', function($http, $location) {
        var originUrl = "";

        function appendSlash(url) {
            if(url.length > 0) {
                url = (url[url.length - 1] === '/') ? url : url + '/';
            }

            return url;
        }

        function createUrl(url) {
            var result = $location.absUrl().match("(http|https)://[^/]*/(.*)/index.html");
            var purifiedUrl = url.indexOf('/') == 0 ? url : '/' + url;
            //var purifiedBaseUrl = result[2].replace("#", '');
            return '/' + result[2] + purifiedUrl;
        }

        return {
            get: function(url) {
                delete $http.defaults.headers.common['X-Requested-With'];
                return $http.get(createUrl(url));
            },
            post: function(url, content) {
                delete $http.defaults.headers.common['X-Requested-With'];
                return $http.post(createUrl(url), content);
            }
        }
    }]);