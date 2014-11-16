angular.module('webTransportModule')
    .factory('restService', ['$http', 'urlService', function($http, urlService) {
        return {
            get: function(url) {
                delete $http.defaults.headers.common['X-Requested-With'];
                return $http.get(urlService.createUrl(url));
            },
            post: function(url, content) {
                delete $http.defaults.headers.common['X-Requested-With'];
                return $http.post(urlService.createUrl(url), content);
            }
        }
    }]);