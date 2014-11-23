'use strict';

angular.module('initiativeRollerApp', [// Modules
                                       'initiativeRollerModule', 'webTransportModule', 'directivesModule',
                                       // Components
                                       'encounterControl', 'creatureControl', 'messageView', 'webSocketStatusView', 'navBar',
                                       // External libraries
                                       'ui.bootstrap', 'panhandler', 'ngRoute', 'ngAnimate', 'ngTouch', 'ngDraggable']);
// Modules
angular.module('initiativeRollerModule', []);
angular.module('webTransportModule', []);
angular.module('directivesModule', []);

// Components
angular.module('encounterControl', []);
angular.module('creatureControl', []);
angular.module('messageView', []);
angular.module('webSocketStatusView', []);
angular.module('navBar', []);

angular.module('initiativeRollerApp')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/initiatives', {templateUrl: 'templates/initiatives.html', controller: 'InitiativesController'})
            .when('/admin', {templateUrl: 'templates/admin.html', controller: 'AdminController'})
            .when('/board', {templateUrl: 'templates/board.html', controller: 'BoardController'})
            .otherwise({redirectTo: '/initiatives'});
    }]);


