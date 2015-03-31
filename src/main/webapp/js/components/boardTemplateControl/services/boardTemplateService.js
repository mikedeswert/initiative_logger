angular.module('boardTemplateControl')
    .factory('boardTemplateService', ['restService', 'messageService', function(restService, messageService) {
        var selectedBoardTemplate;

        return {
            getBoardTemplates: function() {
                return restService.get('/rest/boardtemplate/').then(
                    function(response) {
                        return response.data;
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
            isSelectedBoardTemplateValid: function() {
                return selectedBoardTemplate.name != '' && selectedBoardTemplate.size > 0;
            },
            createBoardTemplate: function() {
                return restService.post('/rest/boardtemplate/add', selectedBoardTemplate)
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
            updateBoardTemplate: function() {
                return restService.post('/rest/boardtemplate/update/', selectedBoardTemplate).then(
                    function () {
                        messageService.addSuccessMessage('The board template was successfully updated.');
                    },
                    function () {
                        messageService.addErrorMessage('Something went wrong while updating the board template. Please refresh the page to try again. \n' +
                        '                           If the problem persists, please contact a site administrator.');
                    }
                )
            },
            deleteBoardTemplate: function() {
                return restService.post('/rest/boardtemplate/delete/' + selectedBoardTemplate.id, null)
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