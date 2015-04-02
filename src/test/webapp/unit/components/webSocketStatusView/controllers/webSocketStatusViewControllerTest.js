"use strict";

describe('WebSocketStatusViewController', function () {
    var scope;
    var webSocketStatusService;
    var $timeout;

    beforeEach(function () {
        module('webSocketStatusView');

        inject(function ($controller, $rootScope, $injector) {
            scope = $rootScope.$new();
            webSocketStatusService = mockito4js.spy($injector.get('webSocketStatusService'));
            $timeout = mockito4js.spy($injector.get('$timeout'));

            $controller('WebSocketStatusViewController', {
                $scope: scope,
                webSocketStatusService: webSocketStatusService,
                $timeout: $timeout
            });
            scope = mockito4js.spy(scope);
        })
    });

    it('should set showStatus to false', function() {
        var actual = scope.showStatus;

        expect(actual).toBe(false);
    });

    it('should set timeout to undefined', function() {
        var actual = scope.timeout;

        expect(actual).toBe(undefined);
    });

    describe('init', function() {
        it('should update the status', function () {
            mockito4js.doNothing().when(scope, 'resetTimer');
            mockito4js.doReturn(webSocketStatusService.connecting).when(webSocketStatusService).getStatus();

            scope.init();
            var actual = scope.status;

            expect(actual).toBe(webSocketStatusService.connecting);
        });

        it('should set show status to true', function () {
            mockito4js.doNothing().when(scope, 'resetTimer');
            mockito4js.doReturn(webSocketStatusService.connecting).when(webSocketStatusService).getStatus();

            scope.init();
            var actual = scope.showStatus;

            expect(actual).toBe(true);
        });

        it('should reset the timer', function () {
            mockito4js.doNothing().when(scope, 'resetTimer');

            mockito4js.doReturn(webSocketStatusService.connecting).when(mockito4js.spy(webSocketStatusService)).getStatus();

            scope.init();

            mockito4js.verify(scope, mockito4js.times(1)).resetTimer();
        });
    });

    describe('getStatus', function() {
        it('should return "Connecting" when status is connecting', function() {
            scope.status = webSocketStatusService.connecting;

            var actual = scope.getStatus();

            expect(actual).toBe('Connecting');
        });

        it('should return "Connected" when status is connected', function() {
            scope.status = webSocketStatusService.connected;

            var actual = scope.getStatus();

            expect(actual).toBe('Connected');
        });

        it('should return "Connection closed" when status is closed', function() {
            scope.status = webSocketStatusService.closed;

            var actual = scope.getStatus();

            expect(actual).toBe('Connection closed');
        });

        it('should return "A connection error occurred" when status is error', function() {
            scope.status = webSocketStatusService.error;

            var actual = scope.getStatus();

            expect(actual).toBe('A connection error occurred');
        });

        it('should return "Status can not be determined" by default', function() {
            scope.status = 'unknown websocket status';

            var actual = scope.getStatus();

            expect(actual).toBe('Status can not be determined');
        });
    });

    describe('isConnecting', function() {
        it('should return true if websocket status is connecting', function() {
            scope.status = webSocketStatusService.connecting;

            var actual = scope.isConnecting();

            expect(actual).toBe(true);
        });

        it('should return false if websocket status is not connecting', function() {
            scope.status = webSocketStatusService.connected;

            var actual = scope.isConnecting();

            expect(actual).toBe(false);
        });
    });

    describe('resetTimer', function() {
        it('should set show status to false after 5000ms', function() {
            scope.resetTimer();

            mockito4js.verify($timeout, mockito4js.once()).wasCalledWith(scope.hideStatus, 5000);
        });

        it('should cancel an existing timeout', function() {
            scope.timeout = {};

            scope.resetTimer();

            mockito4js.verify($timeout, mockito4js.once()).cancel(mockito4js.any(Object));
        });
    });

    describe('hideStatus', function() {
        it('should set showStatus to false', function() {
            scope.showStatus = true;

            scope.hideStatus();
            var actual = scope.showStatus;

            expect(actual).toBe(false);
        });
    });

    function spyOnTimeout(realTimeout) {
        spyOn(realTimeout, 'cancel');
        var timeoutCancel = realTimeout.cancel;
        $timeout = jasmine.createSpy('$timeout');
        $timeout.cancel = timeoutCancel;
    }
});