'use strict';

(function (angular, buildfire) {
  angular.module('smoochChatPluginSettings', ['ui.bootstrap'])
    .controller('SettingsHomeCtrl', ['$scope', 'Buildfire', 'STATUS_CODE', 'TAG_NAMES', 'DataStore', function ($scope, Buildfire, STATUS_CODE, TAG_NAMES, DataStore) {
      var SettingsHome = this;
      SettingsHome.helloWorld = 'Hello World';
      SettingsHome.masterData = null;
      SettingsHome.CHAT_TYPE = {
        PUBLIC: "Public",
        PRIVATE: "Private"
      };


      var _data = {
        settings: {
          "apiKey": "",
          "headerText": "",
          "type": ""
        }
      };

      SettingsHome.isUnchanged = function (data) {
        return angular.equals(data, SettingsHome.masterData);
      };

      SettingsHome.updateMasterItem = function (data) {
        SettingsHome.masterData = angular.copy(data);
      };

      SettingsHome.getAPIKeyStatus = function () {
        return SettingsHome.data && SettingsHome.data.settings && SettingsHome.data.settings.apiKey ? "true" : 'Please enter Smooch Chat API Key';
      };

      SettingsHome.updateChatType = function (_type) {
        SettingsHome.data.settings.type = _type;
      };

      /*Init method call, it will bring all the pre saved data*/
      SettingsHome.init = function () {
        SettingsHome.success = function (result) {
          console.info('init success result:', result);
          SettingsHome.data = {};
          if (result.data) {
            SettingsHome.data = result.data;
            if (!SettingsHome.data.settings)
              SettingsHome.data.settings = {
                "apiKey": "",
                "headerText": "",
                "type": SettingsHome.CHAT_TYPE.PUBLIC
              };

            SettingsHome.chatType = SettingsHome.data.settings.type || SettingsHome.CHAT_TYPE.PUBLIC;
            SettingsHome.updateMasterItem(SettingsHome.data);
          }
        };
        SettingsHome.error = function (err) {
          if (err && err.code !== STATUS_CODE.NOT_FOUND) {
            console.error('Error while getting data', err);
          }
        };
        DataStore.get(TAG_NAMES.SMOOCH_CHAT_INFO).then(SettingsHome.success, SettingsHome.error);
      };
      SettingsHome.init();

      SettingsHome.saveData = function (newObj, tag) {
        if (typeof newObj === 'undefined') {
          return;
        }
        SettingsHome.success = function (result) {
          console.info('Saved data result: ', result);
          SettingsHome.updateMasterItem(newObj);
          Buildfire.messaging.sendMessageToWidget({
            'name': STATUS_CODE.SETTINGS_UPDATED,
            'data': result.data
          });
        };
        SettingsHome.error = function (err) {
          console.error('Error while saving data : ', err);
        };
        DataStore.save(newObj, tag).then(SettingsHome.success, SettingsHome.error);
      };
      SettingsHome.saveApi = function () {
        SettingsHome.saveData(JSON.parse(angular.toJson(SettingsHome.data)), TAG_NAMES.SMOOCH_CHAT_INFO);
      };


      /*Save the data on .5 sec delay*/
      var tmrDelay = null;
      var saveDataWithDelay = function (newObj) {
        if (newObj) {
          if (SettingsHome.isUnchanged(newObj)) {
            return;
          }
          if (tmrDelay) {
            clearTimeout(tmrDelay);
          }
          tmrDelay = setTimeout(function () {
            console.log("insave");
            SettingsHome.saveApi();
          }, 1000);
        }
      };

      /*
       * watch for changes in data and trigger the saveDataWithDelay function on change
       * */

      $scope.$watch(function () {
        return SettingsHome.data;
      }, saveDataWithDelay, true);

      SettingsHome.gotToPage = function () {
        window.open('https://app.smooch.io/signup', '_blank');
      };
    }])
})(window.angular, window.buildfire);