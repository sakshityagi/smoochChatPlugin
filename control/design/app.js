'use strict';

(function (angular, buildfire) {
  angular.module('smoochChatPluginDesign', ['ui.bootstrap'])
    .controller('DesignHomeCtrl', ['$scope', 'Buildfire', 'STATUS_CODE', 'TAG_NAMES', 'DataStore', function ($scope, Buildfire, STATUS_CODE, TAG_NAMES, DataStore) {
      var DesignHome = this;
        DesignHome.helloWorld = 'Hello World';
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