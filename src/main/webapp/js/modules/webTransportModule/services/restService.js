angular.module('webTransportModule')
    .factory('restService', ['$http', 'urlFactory', function($http, urlFactory) {
        return {
            get: function(url) {
                delete $http.defaults.headers.common['X-Requested-With'];
                return $http.get(urlFactory.createUrl(url));
            },
            post: function(url, content) {
                delete $http.defaults.headers.common['X-Requested-With'];
                return $http.post(urlFactory.createUrl(url), angular.toJson(content));
            }
        }
    }]);