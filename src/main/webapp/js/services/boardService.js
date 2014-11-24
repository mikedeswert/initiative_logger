angular.module('initiativeRollerModule')
    .factory('boardService', ['restService', 'messageService', function(restService, messageService) {
        return {
            getBoard: function() {
                return restService.get('/rest/board/')
                    .then(
                    function(response) {
                        return response.data;
                    },
                    function() {
                        messageService.addErrorMessage('Something went wrong while retrieving the board. Please refresh the page to try again.');
                    }
                );
            },
            updateBoard: function(boardToUpdate) {
                return restService.post('/rest/board/update/', boardToUpdate);
            }
        };
    }]);