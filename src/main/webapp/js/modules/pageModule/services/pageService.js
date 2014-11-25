angular.module('pageModule')
    .factory('pageService', ['$location', function ($location) {
        return {
            goToInitiatives: function () {
                $location.path('/initiatives');
            },
            goToEncounters: function () {
                $location.path('/encounters');
            },
            goToBoard: function () {
                $location.path('/board');
            },
            getCurrentPage: function () {
                return $location.path().substr(1);
            }
        }
    }]);