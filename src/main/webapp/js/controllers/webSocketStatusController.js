angular.module('initiativeRollerModule')
    .controller('WebSocketStatusController', ['$scope', 'webSocketStatusService', '$timeout', function($scope, webSocketStatusService, $timeout) {
        $scope.status = webSocketStatusService.getStatus();
        $scope.showStatus = false;

        $scope.getStatus = function() {
            switch($scope.status) {
                case 'connecting': return 'Connecting...'; break;
                case 'connected': return 'Connected'; break;
                case 'closed': return 'Connection closed'; break;
                case 'error': return 'A connection error occurred'; break;
            }
        };

        $scope.isConnecting = function() {
            return $scope.status == 'connecting';
        };

        $scope.$watch(
            function() {
                webSocketStatusService.getStatus();
            },
            function(newVal, oldVal) {
                $scope.status = webSocketStatusService.getStatus();
                $scope.showStatus = true;
                $timeout(function() {
                    $scope.showStatus = false;
                }, 5000)
            }
        )
    }]);