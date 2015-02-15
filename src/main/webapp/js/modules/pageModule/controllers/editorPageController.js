"use strict";

angular.module('pageModule')
    .controller('EditorPageController', ['$scope', 'webSocketService', 'messageService', function ($scope, webSocketService, messageService) {

        $scope.init = function () {
            webSocketService.subscribe('EditorController', updateBoard);

            messageService.clearMessages();
        };



        function updateBoard() {
        }
    }]);