angular.module('webTransportModule')
    .factory('webSocketService' , ['webSocketFactory', function(webSocketFactory) {
        var subscribers = {};
        var socket = webSocketFactory.createNotifyWebSocket(notifySubscribers);

        function notifySubscribers() {
            for(var property in subscribers) {
                if(subscribers.hasOwnProperty(property)) {
                    subscribers[property]();
                }
            }
        }

        return {
            subscribe: function(subscriberName, notifyCallBack) {
                subscribers[subscriberName] = notifyCallBack;
            }
        }
    }]);