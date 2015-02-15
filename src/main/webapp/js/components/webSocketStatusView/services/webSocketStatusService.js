angular.module('webTransportModule')
    .factory('webSocketStatusService' , [function() {
        var connecting = 'connecting';
        var closed = 'closed';
        var error = 'error';
        var connected = 'connected';
        var status = connecting;

        return {
            connecting: connecting,
            closed: closed,
            error: error,
            connected: connected,
            getStatus: function() {
                return status;
            },
            setStatus: function(newStatus) {
                status = newStatus;
            }
        }
    }]);