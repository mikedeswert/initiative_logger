angular.module('boardEditor')
    .factory('boardTemplateService', ['restService', 'messageService', function(restService, messageService) {
        return {
            getBoardTemplates: function() {
                return restService.get('/rest/boardtemplate/')
                    .then(
                    function(response) {
                        return response.data;
                    },
                    function() {
                        messageService.addErrorMessage('Something went wrong while retrieving the board templates. Please refresh the page to try again.');
                    }
                );
            },
            updateBoard: function(boardToUpdate) {
                return restService.post('/rest/boardtemplate/update/', boardToUpdate);
            }
        };
    }]);