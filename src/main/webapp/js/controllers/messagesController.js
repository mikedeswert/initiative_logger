angular.module('initiativeRollerModule')
    .controller('MessagesController', ['$scope', 'messageService', function ($scope, messageService) {
        $scope.messages = messageService.getMessages();

        $scope.$watch(
            function () {
                return messageService.getMessages();
            },
            function () {
                $scope.messages = messageService.getMessages();
            }
        );
    }]);