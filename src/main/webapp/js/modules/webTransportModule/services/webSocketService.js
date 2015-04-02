angular.module('webTransportModule')
    .factory('webSocketService' , ['webSocketFactory', function(webSocketFactory) {
        var subscribers = {};
        var socket;

        function notifySubscribers() {
            for(var property in subscribers) {
                if(subscribers.hasOwnProperty(property)) {
                    subscribers[property]();
                }
            }
        }

        return {
            subscribe: function(subscriberName, notifyCallBack) {
                if(socket == undefined) {
                    this.init();
                }
                subscribers[subscriberName] = notifyCallBack;
            },
            init: function() {
                socket = webSocketFactory.createNotifyWebSocket(notifySubscribers);
            }
        }
    }]);