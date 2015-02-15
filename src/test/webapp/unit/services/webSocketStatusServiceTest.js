"use strict";

describe('webSocketStatusService', function () {
    var webSocketStatusService;

    beforeEach(function () {
        module('webTransportModule');

        inject(function(_webSocketStatusService_) {
            webSocketStatusService = _webSocketStatusService_;
        });
    });

    describe('getStatus', function() {
        it('should by default return connecting as the status of the web socket', function() {
            var actual = webSocketStatusService.getStatus();

            expect(actual).toBe(webSocketStatusService.connecting);
        });
    });

    describe('setStatus', function() {
        it('should set the web socket status' , function() {
            webSocketStatusService.setStatus(webSocketStatusService.connected);

            var actual = webSocketStatusService.getStatus();

            expect(actual).toBe(webSocketStatusService.connected);
        });
    });

});
