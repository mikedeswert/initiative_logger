"use strict";

describe('messageService', function () {
    var messageService;

    beforeEach(function () {
        module('messageView');

        inject(function (_messageService_) {
            messageService = _messageService_;
        })
    });

    describe('clearMessages', function() {
        it('should clear the message list', function() {
            messageService.addErrorMessage('dummyErrorMessage');

            messageService.clearMessages();

            expect(messageService.getMessages().length).toBe(0);
        });
    });

    describe('addErrorMessage', function() {
        it('should clear the message list and add an error message', function() {
            messageService.addErrorMessage('dummyErrorMessage');
            messageService.addErrorMessage('dummyErrorMessage');

            var actual = messageService.getMessages();

            expect(actual.length).toBe(1);
            expect(actual[0].type).toBe('error');
            expect(actual[0].class).toBe('alert alert-danger');
            expect(actual[0].text).toBe('dummyErrorMessage');
        });
    });

    describe('addSuccessMessage', function() {
        it('should clear the message list and add a success message', function() {
            messageService.addSuccessMessage('dummySuccessMessage');
            messageService.addSuccessMessage('dummySuccessMessage');

            var actual = messageService.getMessages();

            expect(actual.length).toBe(1);
            expect(actual[0].type).toBe('success');
            expect(actual[0].class).toBe('alert alert-success');
            expect(actual[0].text).toBe('dummySuccessMessage');
        });
    });

    describe('addWarningMessage', function() {
        it('should clear the message list and add a warning message', function() {
            messageService.addWarningMessage('dummyWarningMessage');
            messageService.addWarningMessage('dummyWarningMessage');

            var actual = messageService.getMessages();

            expect(actual.length).toBe(1);
            expect(actual[0].type).toBe('warning');
            expect(actual[0].class).toBe('alert alert-warning');
            expect(actual[0].text).toBe('dummyWarningMessage');
        });
    });

    describe('removeMessage', function() {
        it('should remove the message from the list', function() {
            messageService.addWarningMessage('dummyWarningMessage');
            var message = messageService.getMessages()[0];

            messageService.removeMessage(message);

            expect(messageService.getMessages().length).toBe(0);
        });
    });

    describe('getMessages', function() {
        it('should return a list of all messages', function() {
            messageService.addWarningMessage('dummyWarningMessage');

            var actual = messageService.getMessages();

            expect(actual.length).toBe(1);
            expect(actual[0].type).toBe('warning');
            expect(actual[0].class).toBe('alert alert-warning');
            expect(actual[0].text).toBe('dummyWarningMessage');
        });
    });

});