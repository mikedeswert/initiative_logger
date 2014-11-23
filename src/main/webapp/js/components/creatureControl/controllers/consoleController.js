angular.module('creatureControl')
    .controller('ConsoleController', ['$scope', 'restService', 'messageService', function ($scope, restService, messageService) {
        $scope.feedback = '';
        $scope.input = '';

        $scope.init = function () {

        };

        $scope.sendInput = function () {
            $scope.feedback += '> ' + $scope.input + '\n';
            restService.post('/rest/console/send?input=' + $scope.input, null)
                .then(function (response) {
                    $scope.feedback += response.data;
                    $scope.$parent.getCreatures();
                    $scope.input = '';
                }, function() {
                    messageService.addErrorMessage('Something went wrong while sending the input to the server. Please try again later.');
                });
        };

    }]);