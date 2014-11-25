'use strict';

angular.module('initiativeRollerApp', [// Modules
                                       'pageModule', 'webTransportModule', 'formDirectivesModule',
                                       // Components
                                       'encounterControl', 'creatureControl', 'boardControl', 'messageView', 'webSocketStatusView', 'navBar',
                                       // External libraries
                                       'ui.bootstrap', 'panhandler', 'ngRoute', 'ngAnimate', 'ngTouch', 'ngDraggable']);
// Modules
angular.module('pageModule', []);
angular.module('webTransportModule', []);
angular.module('formDirectivesModule', []);

// Components
angular.module('encounterControl', []);
angular.module('creatureControl', []);
angular.module('boardControl', []);
angular.module('messageView', []);
angular.module('webSocketStatusView', []);
angular.module('navBar', []);

angular.module('initiativeRollerApp')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/initiatives', {templateUrl: 'templates/initiatives.html', controller: 'InitiativesPageController'})
            .when('/encounters', {templateUrl: 'templates/encounters.html', controller: 'EncounterPageController'})
            .when('/board', {templateUrl: 'templates/board.html', controller: 'BoardPageController'})
            .otherwise({redirectTo: '/initiatives'});
    }]);


