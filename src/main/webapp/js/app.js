'use strict';

angular.module('initiativeRollerApp', ['initiativeRollerModule', 'restModule', 'messageModule', 'directivesModule', 'ui.bootstrap', 'ngRoute']);
angular.module('initiativeRollerModule', []);
angular.module('restModule', []);
angular.module('messageModule', []);
angular.module('directivesModule', []);

angular.module('initiativeRollerApp')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: 'templates/initiatives.html', controller: 'InitiativesController'})
            .when('/admin', {templateUrl: 'templates/admin.html', controller: 'AdminController'})
            .otherwise({redirectTo: '/'});
    }]);

