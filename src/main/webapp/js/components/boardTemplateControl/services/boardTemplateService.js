angular.module('boardTemplateControl')
    .factory('boardTemplateService', ['restService', 'messageService', 'boardTemplateFactory', function(restService, messageService, boardTemplateFactory) {
        var selectedBoardTemplate;

        return {
            getBoardTemplates: function() {
                return restService.get('/rest/boardtemplate/').then(
                    function(response) {
                        var boardTemplates = [];

                        response.data.forEach(function(rawBoardTemplate) {
                            boardTemplates.push(boardTemplateFactory.createBoardTemplate(rawBoardTemplate));
                        });
                        
                        return boardTemplates;
                    },
                    function() {
                        messageService.addErrorMessage('Something went wrong while retrieving the board templates. Please refresh the page to try again.');
                    }
                );
            },
            setSelectedBoardTemplate: function(newSelectedBoardTemplate) {
                selectedBoardTemplate = newSelectedBoardTemplate;
            },
            getSelectedBoardTemplate: function() {
                return selectedBoardTemplate;
            },
            isBoardTemplateSelected: function() {
                return selectedBoardTemplate != undefined;
            },
            isBoardTemplateValid: function(boardTemplate) {
                return boardTemplate.name != '' && boardTemplate.size > 0;
            },
            createBoardTemplate: function(boardTemplate) {
                return restService.post('/rest/boardtemplate/add', boardTemplate)
                    .then(
                    function () {
                        messageService.addSuccessMessage('The board template was successfully created.');
                    },
                    function () {
                        messageService.addErrorMessage('Something went wrong while creating the board template. Please refresh the page to try again. \n' +
                        '                           If the problem persists, please contact a site administrator.');
                    }
                )
            },
            updateBoardTemplate: function(boardTemplate) {
                return restService.post('/rest/boardtemplate/update/', boardTemplate).then(
                    function () {
                        messageService.addSuccessMessage('The board template was successfully updated.');
                    },
                    function () {
                        messageService.addErrorMessage('Something went wrong while updating the board template. Please refresh the page to try again. \n' +
                        '                           If the problem persists, please contact a site administrator.');
                    }
                )
            },
            deleteBoardTemplate: function(boardTemplate) {
                return restService.post('/rest/boardtemplate/delete/' + boardTemplate.id, null)
                    .then(
                    function () {
                        messageService.addSuccessMessage('Board template was successfully deleted.');
                    },
                    function () {
                        messageService.addErrorMessage('Something went wrong while deleting the board template. Please refresh the page to try again. \n' +
                        '                           If the problem persists, please contact a site administrator.')
                    }
                );
            }
        };
    }]);