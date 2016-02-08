'use strict';

(function (angular, buildfire) {
  angular.module('smoochChatPluginDesign', ['ui.bootstrap'])
    .controller('DesignHomeCtrl', ['$scope', 'Buildfire', 'STATUS_CODE', 'TAG_NAMES', 'DataStore', function ($scope, Buildfire, STATUS_CODE, TAG_NAMES, DataStore) {
      var DesignHome = this;
        DesignHome.data = {
          settings: {
            "apiKey": "",
            "headerText": ""
          },
          design:{
            color:""
          }
        };
        DesignHome.color = {
        design:[
            { name:"5d8aa8"},
            { name:"007fff"},
            { name:"9966cc"},
            { name:"98777b"},
            { name:"a4c639"},
            { name:"e52b50"},
            { name:"e32636"},
          ]
      };

      /*Init method call, it will bring all the pre saved data*/
        DesignHome.init = function () {
          DesignHome.success = function (result) {
          console.info('init success result:', result);
          if (result) {
            DesignHome.data = result.data;
            if (!DesignHome.data.design) {
              DesignHome.data.design = {};
              DesignHome.data.design.color = DesignHome.color.design[0].name;
            }
          }
        };
          DesignHome.error = function (err) {
          if (err && err.code !== STATUS_CODE.NOT_FOUND) {
            console.error('Error while getting data', err);
          }
          else if (err && err.code === STATUS_CODE.NOT_FOUND) {
            DesignHome.saveData(JSON.parse(angular.toJson(DesignHome.data)), TAG_NAMES.SMOOCH_CHAT_INFO);
          }
        };
        DataStore.get(TAG_NAMES.SMOOCH_CHAT_INFO).then(DesignHome.success, DesignHome.error);
      };
        DesignHome.init();

        DesignHome.saveData = function (newObj, tag) {
        if (typeof newObj === 'undefined') {
          return;
        }
          DesignHome.success = function (result) {
          console.info('Saved data result: ', result);
        };
          DesignHome.error = function (err) {
          console.error('Error while saving data : ', err);
        };

        Buildfire.messaging.sendMessageToWidget({'name': STATUS_CODE.UPDATED, 'color': DesignHome.data.design.color});

        DataStore.save(newObj, tag).then(DesignHome.success, DesignHome.error);
      };

        DesignHome.changeColor = function (color) {
          DesignHome.data.design.color = color;
           DesignHome.saveData(JSON.parse(angular.toJson(DesignHome.data)), TAG_NAMES.SMOOCH_CHAT_INFO);
      };

        DesignHome.gotToPage = function(){
        window.open('https://app.smooch.io/signup', '_blank');
      };
    }])
})(window.angular, window.buildfire);