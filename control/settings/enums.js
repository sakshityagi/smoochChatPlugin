'use strict';

(function (angular) {
    angular.module('smoochChatPluginSettings')
        .constant('TAG_NAMES', {
            SMOOCH_CHAT_INFO: 'smoochChatInfo'
        })
        .constant('STATUS_CODE', {
            INSERTED: 'inserted',
            UPDATED: 'updated',
            SETTINGS_UPDATED: 'SETTINGS_UPDATED',
            NOT_FOUND: 'NOTFOUND',
            UNDEFINED_DATA: 'UNDEFINED_DATA',
            UNDEFINED_OPTIONS: 'UNDEFINED_OPTIONS',
            UNDEFINED_ID: 'UNDEFINED_ID',
            ITEM_ARRAY_FOUND: 'ITEM_ARRAY_FOUND',
            NOT_ITEM_ARRAY: 'NOT_ITEM_ARRAY'
        })
        .constant('STATUS_MESSAGES', {
            UNDEFINED_DATA: 'Undefined data provided',
            UNDEFINED_OPTIONS: 'Undefined options provided',
            UNDEFINED_ID: 'Undefined id provided',
            NOT_ITEM_ARRAY: 'Array of Items not provided',
            ITEM_ARRAY_FOUND: 'Array of Items provided'
        })
      .constant('PROXY_SERVER', {
        serverUrl: "http://proxy.buildfire.com"
      });
})(window.angular);