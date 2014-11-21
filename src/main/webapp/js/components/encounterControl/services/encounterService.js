angular.module('encounterControl')
    .factory('encounterService', ['restService', 'messageService', function (restService, messageService) {
        var selectedEncounter;

        return {
            getSelectedEncounter: function() {
                return selectedEncounter;
            },
            setSelectedEncounter: function(newSelectedEncounter) {
                selectedEncounter = newSelectedEncounter;
            },
            getEncounters: function () {
                return restService.get('/rest/encounter/')
                    .then(
                    function (response) {
                        return response.data;
                    },
                    function () {
                        messageService.addErrorMessage('Something went wrong while retrieving the encounters. Please refresh the page to try again.');
                    }
                );
            },
            createEncounter: function (newEncounter) {
                return restService.post('/rest/encounter/add', newEncounter)
                    .then(
                    function () {
                        messageService.addSuccessMessage('The encounter was successfully saved.');
                    },
                    function () {
                        messageService.addErrorMessage('Something went wrong while saving the encounter. Please refresh the page to try again. \n' +
                        '                           If the problem persists, please contact a site administrator.');
                    }
                )
            },
            updateEncounter: function (encounterToUpdate) {
                return restService.post('/rest/encounter/update/', encounterToUpdate)
                    .then(
                    function () {
                        messageService.addSuccessMessage('The encounter was successfully updated.');
                    },
                    function () {
                        messageService.addErrorMessage('Something went wrong while updating the encounter. Please refresh the page to try again. \n' +
                        '                           If the problem persists, please contact a site administrator.');
                    }
                )
            },
            deleteEncounter: function (encounterToDelete) {
                restService.post('/rest/encounter/delete/' + encounterToDelete.id, null)
                    .then(
                    function () {
                        messageService.addSuccessMessage('Encounter was successfully deleted.');
                    },
                    function () {
                        messageService.addErrorMessage('Something went wrong while deleting the encounter. Please refresh the page to try again. \n' +
                        '                           If the problem persists, please contact a site administrator.')
                    }
                );
            },
            calculateCreatureInitiatives: function (encounter) {
                restService.post('/rest/encounter/calculate', encounter)
                    .then(
                    function (response) {
                        // Do nothing
                    },
                    function () {
                        messageService.addErrorMessage('Something went wrong while calculating the initiatives. Please refresh the page to try again. \n' +
                        '                           If the problem persists, please contact a site administrator.');
                    }
                );
            },
            resetCreatures: function (encounter) {
                restService.post('/rest/encounter/reset', encounter)
                    .then(
                    function () {
                        // Do nothing
                    },
                    function () {
                        messageService.addErrorMessage('Something went wrong while resetting the creatures. Please refresh the page to try again. \n' +
                        '                           If the problem persists, please contact a site administrator.');
                    }
                );
            },
            isEncounterValid: function (encounter) {
                if (typeof encounter == 'undefined' || encounter == null) {
                    return false;
                }

                return typeof encounter.name != 'undefined' && encounter.name != null && encounter.name.trim() !== '';

            }
        };
    }]);