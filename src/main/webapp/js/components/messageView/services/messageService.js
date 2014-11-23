angular.module('messageView')
    .factory('messageService', [function() {
        var messages = [];

        return {
            clearMessages: function() {
                               messages = [];
                           },
            addErrorMessage: function(text) {
                                this.clearMessages();
                                messages.push({type:'error', class:'alert alert-danger', text: text});
                             },
            addSuccessMessage: function(text) {
                                   this.clearMessages();
                                   messages.push({type:'success', class:'alert alert-success', text: text});
                               },
            removeMessage: function(message) {
                               messages.splice(messages.indexOf(message), 1);
                           },
            getMessages: function() {
                            return messages;
                         }
        }
    }]);