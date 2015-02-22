angular.module('webSocketStatusView')
    .controller('WebSocketStatusViewController', ['$scope', 'webSocketStatusService', '$timeout', function ($scope, webSocketStatusService, $timeout) {
        $scope.status;
        $scope.showStatus = false;
        $scope.timeout;

        $scope.init = function () {
            updateStatus();
        };

        $scope.getStatus = function () {
            switch ($scope.status) {
                case webSocketStatusService.connecting:
                    return 'Connecting';
                    break;
                case webSocketStatusService.connected:
                    return 'Connected';
                    break;
                case webSocketStatusService.closed:
                    return 'Connection closed';
                    break;
                case webSocketStatusService.error:
                    return 'A connection error occurred';
                    break;
                default:
                    return 'Status can not be determined';
            }
        };

        $scope.isConnecting = function () {
            return $scope.status == webSocketStatusService.connecting;
        };

        $scope.resetTimer = function () {
            if ($scope.timeout != undefined && $scope.timeout != null) {
                $timeout.cancel($scope.timeout);
            }
            $scope.timeout = $timeout($scope.hideStatus, 5000)
        };

        $scope.hideStatus = function () {
            $scope.showStatus = false;
        };

        $scope.$watch(
            function () {
                return webSocketStatusService.getStatus();
            },
            function (newVal, oldVal) {
                updateStatus();
            }
        );

        function updateStatus() {
            $scope.status = webSocketStatusService.getStatus();
            $scope.showStatus = true;
            $scope.resetTimer();
        }
    }]);