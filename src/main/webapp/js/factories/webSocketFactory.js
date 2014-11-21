angular.module('webTransportModule').service('webSocketFactory', ['$timeout', 'webSocketStatusService', 'urlFactory', function($timeout, webSocketStatusService, urlFactory) {
    function initializeSocket(notifyCallback) {
        var socket = {};
        socket.client = new SockJS(urlFactory.createUrl('notify'));
        socket.stomp = Stomp.over(socket.client);
        socket.stomp.connect({}, function() {
            socket.stomp.subscribe("/topic/notify", notifyCallback);
        });

        return socket;
    }

    function createWebSocket(notifyCallback) {
        var socket = initializeSocket(notifyCallback);

        var onopen = socket.client.onopen;
        socket.client.onopen = function() {
            webSocketStatusService.setStatus('connecting');
            onopen();
        };

        var onclose = socket.client.onclose;
        socket.client.onclose = function() {
            webSocketStatusService.setStatus('closed');
            onclose();
            reconnect(socket, notifyCallback);
        };

        socket.client.onerror = function() {
            webSocketStatusService.setStatus('error');
            reconnect(socket, notifyCallback);
        };

        var onmessage = socket.client.onmessage;
        socket.client.onmessage = function(evt) {
            onmessage(evt);
            webSocketStatusService.setStatus('connected');
        };

        return socket;
    }

    this.createNotifyWebSocket = function(notifyCallback) {
        return createWebSocket(notifyCallback);
    };

    function reconnect(socket, notifyCallback) {
        $timeout(function() {
            socket = createWebSocket(notifyCallback);
        }, 10000);
    }

}]);