angular.module('webTransportModule')
    .factory('creatureService', ['restService', 'messageService', 'creatureFactory', function(restService, messageService, creatureFactory) {
        return {
            getCreatures: function() {
                return restService.get('/rest/creature/')
                    .then(
                    function(response) {
                        return response.data;
                    },
                    function() {
                        messageService.addErrorMessage('Something went wrong while retrieving the creatures. Please refresh the page to try again.');
                    }
                );
            },
            createCreature: function(newCreature) {
                var restEndpoint = newCreature.type == 'monster' ? 'addMonster' : 'addPlayer';
                return restService.post('/rest/creature/' + restEndpoint + '?name=' + newCreature.name +
                    '&initiative=' + newCreature.initiative +
                    '&calculatedInitiative=' + newCreature.calculatedInitiative, null)
                    .then(
                    function () {
                        messageService.addSuccessMessage('The creature was successfully saved.');
                    },
                    function () {
                        messageService.addErrorMessage('Something went wrong while saving the creature. Please refresh the page to try again. \n' +
                            '                           If the problem persists, please contact a site administrator.');
                    }
                )
            },
            updateCreature: function(creatureToUpdate) {
                return restService.post('/rest/creature/update/' + creatureToUpdate.oldName +
                    '?newName=' + creatureToUpdate.name +
                    '&initiative=' + creatureToUpdate.initiative +
                    '&calculatedInitiative=' + creatureToUpdate.calculatedInitiative, null)
                    .then(
                    function () {
                        messageService.addSuccessMessage('The creature was successfully updated.');
                    },
                    function () {
                        messageService.addErrorMessage('Something went wrong while updating the creature. Please refresh the page to try again. \n' +
                            '                           If the problem persists, please contact a site administrator.');
                    }
                )
            },
            deleteCreature: function(creature) {
                restService.post('/rest/creature/delete/' + creature.id, null)
                    .then(
                    function() {
                        messageService.addSuccessMessage('Creature was successfully deleted.');
                    },
                    function() {
                        messageService.addErrorMessage('Something went wrong while deleting the creature. Please refresh the page to try again. \n' +
                            '                           If the problem persists, please contact a site administrator.')
                    }
                );
            },
            calculateInitiatives: function() {
                restService.get('/rest/creature/calculate')
                    .then(
                    function(response) {
                        // Do nothing
                    },
                    function() {
                        messageService.addErrorMessage('Something went wrong while retrieving the calculated initiatives. Please refresh the page to try again. \n' +
                            '                           If the problem persists, please contact a site administrator.');
                    }
                );
            },
            resetCreatures: function() {
                restService.post('/rest/creature/reset', null)
                    .then(
                    function() {
                        // Do nothing
                    },
                    function() {
                        messageService.addErrorMessage('Something went wrong while resetting the creatures. Please refresh the page to try again. \n' +
                            '                           If the problem persists, please contact a site administrator.');
                    }
                );
            },
            isCreatureValid: function(creature) {
                if(typeof creature == 'undefined' || creature == null) {
                    return false;
                }

                return typeof creature.name != 'undefined' && creature.name != null && creature.name.trim() !== '';

            }
        };
    }]);