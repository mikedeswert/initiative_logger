'use strict';

angular.module('initiativeRollerApp', ['initiativeRollerModule',
                                       'restModule',
                                       'messageModule',
                                       'directivesModule',
                                       'consoleModule',
                                       'ui.bootstrap',
                                       'ngRoute',
                                       'ngAnimate',
                                       'ngTouch']);
angular.module('initiativeRollerModule', []);
angular.module('restModule', []);
angular.module('messageModule', []);
angular.module('directivesModule', []);
angular.module('consoleModule', []);

angular.module('initiativeRollerApp')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/initiatives', {templateUrl: 'templates/initiatives.html', controller: 'InitiativesController'})
            .when('/admin', {templateUrl: 'templates/admin.html', controller: 'AdminController'})
            .otherwise({redirectTo: '/initiatives'});
    }]);

