angular.module('boardControl').service('tokenFactory', [function()  {
    this.createCreatureToken= function(creature) {
        return {creature: creature, type:'creatureToken'};
    };
}]);