angular.module('boardControl').service('tokenFactory', [function()  {
    this.createCreatureToken= function(positionX, positionY, creature) {
        return {positionX: positionX, positionY: positionY, creature: creature, type:'creatureToken'};
    };
}]);