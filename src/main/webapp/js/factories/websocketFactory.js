angular.module('webTransportModule').service('webSocketFactory', ['messageService', function(messageService, urlService, webSocketStatusService) {
    function browserDoesNotSupportWebSockets() {
        return !window.WebSocket;
    }

    this.createNotifyWebSocket = function(updateCallback) {
        if(browserDoesNotSupportWebSockets()) {
            messageService.addErrorMessage('Woops! This browser does not support websockets. Please switch to a browser with websocket support in order to use this application.')
            return null;
        }

        var socket = new WebSocket(urlService.createUrl('notify'));

        socket.onopen = function() {
            webSocketStatusService.setStatus('connecting');
        };

        socket.onclose = function() {
            webSocketStatusService.setStatus('closed');
        };

        socket.onerror = function() {
            webSocketStatusService.setStatus('error');
        };

        socket.onmessage = function(message) {
            if(message == 'connected') {
                webSocketStatusService.setStatus('connected');
            }

            if(message == 'update') {
                updateCallback();
            }
        };

        return socket;
    };

}]);