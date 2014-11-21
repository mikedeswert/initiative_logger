'use strict';

angular.module('initiativeRollerApp', ['initiativeRollerModule',
                                       'webTransportModule',
                                       'messageModule',
                                       'directivesModule',
                                       'consoleModule',
                                       'encounterControl',
                                       'ui.bootstrap',
                                       'panhandler',
                                       'ngRoute',
                                       'ngAnimate',
                                       'ngTouch',
                                       'ngDraggable']);
angular.module('initiativeRollerModule', []);
angular.module('webTransportModule', []);
angular.module('messageModule', []);
angular.module('directivesModule', []);
angular.module('consoleModule', []);
angular.module('encounterControl', []);

angular.module('initiativeRollerApp')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/initiatives', {templateUrl: 'templates/initiatives.html', controller: 'InitiativesController'})
            .when('/admin', {templateUrl: 'templates/admin.html', controller: 'AdminController'})
            .when('/board', {templateUrl: 'templates/board.html', controller: 'BoardController'})
            .otherwise({redirectTo: '/initiatives'});
    }]);

//test feature branch

