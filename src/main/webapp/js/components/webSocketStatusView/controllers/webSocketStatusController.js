angular.module('webSocketStatusView')
    .controller('WebSocketStatusController', ['$scope', 'webSocketStatusService', '$timeout', function($scope, webSocketStatusService, $timeout) {
        $scope.status = updateStatus();
        $scope.showStatus = false;

        var timeout;

        $scope.getStatus = function() {
            switch($scope.status) {
                case 'connecting': return 'Connecting'; break;
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
                return webSocketStatusService.getStatus();
            },
            function(newVal, oldVal) {
                updateStatus();
            }
        );

        function resetTimer() {
            if(typeof timeout != 'undefined' && timeout != null) {
                $timeout.cancel(timeout);
            }
            timeout = $timeout(function () {
                $scope.showStatus = false;
            }, 5000)
        }

        function updateStatus() {
            $scope.status = webSocketStatusService.getStatus();
            $scope.showStatus = true;
            resetTimer();
        }
    }]);