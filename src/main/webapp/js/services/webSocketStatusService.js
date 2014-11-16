angular.module('webTransportModule')
    .factory('webSocketStatusService' , [function() {
        var status = 'connecting';
        return {
            getStatus: function() {
                return status;
            },
            setStatus: function(newStatus) {
                status = newStatus;
            }
        }
    }]);