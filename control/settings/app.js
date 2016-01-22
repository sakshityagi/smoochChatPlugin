'use strict';

(function (angular,buildfire) {
    angular.module('smoochChatPluginSettings', ['ui.bootstrap'])
        .controller('SettingsHomeCtrl',['$scope', 'Buildfire', 'STATUS_CODE', 'TAG_NAMES', 'DataStore', function($scope, Buildfire, STATUS_CODE, TAG_NAMES, DataStore){
            var SettingsHome = this;
            SettingsHome.helloWorld = 'Hello World';
           // Smooch.init({appToken: '630vy96ywcm2d9iqs19y6b5xa'});

            //Smooch.init({
            //    appToken: 'ecmipaz246piiw0kd1jhe0gty',
            //    customText: {
            //        headerText: 'How can we help?',
            //        inputPlaceholder: 'Type a message...',
            //        sendButtonText: 'Send',
            //        introText: 'This is the beginning of your conversation.<br/> Ask us anything!',
            //        settingsText: 'You can leave us your email so that we can get back to you this way.'
            //    }
            //});

            SettingsHome.data = {
                settings:{
                    "apiKey":""
                }
            }

            /*Init method call, it will bring all the pre saved data*/
            SettingsHome.init = function () {
                SettingsHome.success = function (result) {
                    console.info('init success result:', result);
                    if (result) {
                        SettingsHome.data = result.data;
                        if (!SettingsHome.data.settings)
                            SettingsHome.data.settings = {};
                        SettingsHome.apiKey = SettingsHome.data.settings.apiKey;
                    }
                };
                SettingsHome.error = function (err) {
                    if (err && err.code !== STATUS_CODE.NOT_FOUND) {
                        console.error('Error while getting data', err);
                    }
                    else if (err && err.code === STATUS_CODE.NOT_FOUND) {
                        SettingsHome.saveData(JSON.parse(angular.toJson(SettingsHome.data)), TAG_NAMES.SMOOCH_CHAT_DATA);
                    }
                };
                DataStore.get(TAG_NAMES.SMOOCH_CHAT_DATA).then(SettingsHome.success, SettingsHome.error);
            };
            SettingsHome.init();

            SettingsHome.saveData = function (newObj, tag) {
                if (typeof newObj === 'undefined') {
                    return;
                }
                SettingsHome.success = function (result) {
                    console.info('Saved data result: ', result);
                };
                SettingsHome.error = function (err) {
                    console.error('Error while saving data : ', err);
                };
                DataStore.save(newObj, tag).then(SettingsHome.success, SettingsHome.error);
            };

            SettingsHome.saveApi = function () {
                SettingsHome.data.settings.apiKey = SettingsHome.apiKey;
                SettingsHome.saveData(JSON.parse(angular.toJson(SettingsHome.data)), TAG_NAMES.SMOOCH_CHAT_DATA);
              };
        }])
})(window.angular,window.buildfire);