angular.module('initiativeRollerModule')
    .controller('BoardController', ['$scope', 'restService', 'messageService', 'pageService', function($scope, restService, messageService, pageService) {
        $scope.creatures = [];
        $scope.messageService = messageService;
        $scope.pageService = pageService;
        $scope.board = {};
        $scope.isCreatureTokenListOpen = false;

        $scope.init = function() {
            messageService.clearMessages();
            getCreatures();
            getBoard();
        };

        function getCreatures() {
            restService.get('/rest/creature/')
                .then(
                function(response) {
                    $scope.creatures = response.data;
                },
                function() {
                    messageService.addErrorMessage('Something went wrong while retrieving the creatures. Please refresh the page to try again.');
                }
            );
        }

        function getBoard() {
            restService.get('/rest/board/')
                .then(
                function(response) {
                    $scope.board = response.data;
                },
                function() {
                    messageService.addErrorMessage('Something went wrong while retrieving the board. Please refresh the page to try again.');
                }
            );
        }
    }]);