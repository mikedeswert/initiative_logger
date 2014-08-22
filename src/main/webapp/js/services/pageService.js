angular.module('initiativeRollerModule')
    .factory('pageService', ['$location', function($location) {
        return {
            goToInitiatives: function() {
                               $location.path('/');
                           },
            goToAdmin: function() {
                           $location.path('/admin');
                       }
        }
    }]);