/**
 * Project
 * @namespace crowdsource.message.services
 */
(function () {
    'use strict';

    angular
        .module('crowdsource.message.services')
        .factory('Message', Message);

    Message.$inject = ['$cookies', '$http', '$q', '$location', 'HttpService'];

    /**
     * @namespace Message
     * @returns {Factory}
     */

    function Message($cookies, $http, $q, $location, HttpService) {
        /**
         * @name Message
         * @desc The Factory to be returned
         */
        var Message = {
            getProjects: getProjects,
            sendMessage: sendMessage,
            listConversations: listConversations,
            listMessages: listMessages,
            createConversation: createConversation
        };

        return Message;

        function getProjects() {
            var settings = {
                url: '/api/project/list_feed/',
                method: 'GET'
            };
            return HttpService.doRequest(settings);
        }

        function sendMessage(message, recipient, conversation_id) {
            var settings = {
                url: '/api/inbox/',
                method: 'POST',
                data: {
                    recipient: recipient,
                    message: message,
                    conversation: conversation_id
                }
            };
            return HttpService.doRequest(settings);
        }

        function listConversations() {
            var settings = {
                url: '/api/conversation/',
                method: 'GET'
            };
            return HttpService.doRequest(settings);
        }

        function listMessages(conversation_id) {
            var settings = {
                url: '/api/message/list-by-conversation/?conversation=' + conversation_id,
                method: 'GET'
            };
            return HttpService.doRequest(settings);
        }

        function createConversation(recipients, subject) {
            var settings = {
                url: '/api/conversation/',
                method: 'POST',
                data: {
                    recipients: recipients,
                    subject: subject || 'Direct Message'
                }
            };
            return HttpService.doRequest(settings);
        }

    }
})();
