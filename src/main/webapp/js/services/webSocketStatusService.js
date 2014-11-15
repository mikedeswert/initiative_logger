angular.module('webTransportModule')
    .factory('webSocketStatusService', [function() {
        var status = 'closed';
        return {
            getStatus: function() {
                return status;
            },
            setStatus: function(newStatus) {
                status = newStatus;
            }
        }
    }]);