angular.module('initiativeRollerModule').service('creatureFactory', function() {
    this.createDefaultCreature = function() {
        return {name:'', type:'monster', initiative: 0, calculatedInitiative: 0};
    };

});