"use strict";

describe('webSocketStatusService', function () {
    var webSocketStatusService;

    beforeEach(function () {
        module('webTransportModule');

        inject(function(_webSocketStatusService_) {
            webSocketStatusService = _webSocketStatusService_;
        });
    });

    it('should by default return closed as the status of the web socket', function() {
        var actual = webSocketStatusService.getStatus();

        expect(actual).toBe('connecting');
    });

    it('should set the web socket status' , function() {
        webSocketStatusService.setStatus('connected');

        var actual = webSocketStatusService.getStatus();

        expect(actual).toBe('connected');
    });
});
