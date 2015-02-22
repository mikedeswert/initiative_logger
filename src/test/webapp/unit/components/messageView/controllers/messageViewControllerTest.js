"use strict";

describe('MessageViewController', function () {
    var scope;
    var messageService;

    beforeEach(function () {
        module('messageView');

        inject(function ($controller, $rootScope, _messageService_) {
            scope = $rootScope.$new();
            messageService = mockito4js.spy(_messageService_);
            messageService.addErrorMessage('dummyErrorMessage');

            $controller('MessageViewController', {
                $scope: scope,
                messageService: messageService
            });
        })
    });

    it('should retrieve the messages from the message service', function () {
        var actual = scope.messages;

        expect(actual.length).toBe(1);
        expect(actual[0].type).toBe('error');
        expect(actual[0].class).toBe('alert alert-danger');
        expect(actual[0].text).toBe('dummyErrorMessage');
    });

    it('should retrieve the messages if a change occurs in the messageService messages list', function () {
        messageService.addWarningMessage('dummyWarningMessage');
        scope.$apply();

        var actual = scope.messages;

        expect(actual.length).toBe(1);
        expect(actual[0].type).toBe('warning');
        expect(actual[0].class).toBe('alert alert-warning');
        expect(actual[0].text).toBe('dummyWarningMessage');
    });

    describe('removeMessage', function () {
        it('should call the remove message method of messageService', function () {
            var message = {text: 'randomMessage'};

            scope.removeMessage(message);

            mockito4js.verify(messageService, mockito4js.times(1)).removeMessage(message);
        });
    });
});