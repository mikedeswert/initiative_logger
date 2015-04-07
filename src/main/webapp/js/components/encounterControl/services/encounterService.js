angular.module('encounterControl')
    .factory('encounterService', ['restService', 'messageService', function (restService, messageService) {
        var selectedEncounter;

        function ensureCreatureArrayExists(encounters) {
            angular.forEach(encounters, function(encounter) {
                if(typeof encounter.creatures == 'undefined' || encounter.creatures == null) {
                    encounter.creatures = [];
                }
            });

            return encounters;
        }

        return {
            getSelectedEncounter: function() {
                return selectedEncounter;
            },
            setSelectedEncounter: function(newSelectedEncounter) {
                selectedEncounter = newSelectedEncounter;
            },
            isEncounterSelected: function() {
                return typeof selectedEncounter != 'undefined' && selectedEncounter != null;
            },
            getEncounters: function () {
                return restService.get('/rest/encounter/')
                    .then(
                    function (response) {
                        return ensureCreatureArrayExists(response.data);
                    },
                    function () {
                        messageService.addErrorMessage('Something went wrong while retrieving the encounters. Please refresh the page to try again.');
                    }
                );
            },
            createEncounter: function (newEncounter, templateId) {
                return restService.post('/rest/encounter/add/template/' + templateId, newEncounter)
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
            updateEncounter: function (encounterToUpdate, templateId) {
                return restService.post('/rest/encounter/update/template/' + templateId, encounterToUpdate)
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