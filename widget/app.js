'use strict';

(function (angular) {
  angular.module('smoochChatPluginWidget', ['ui.bootstrap'])
    .controller('WidgetHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE) {
        var WidgetHome = this;
        WidgetHome.data = {};
        WidgetHome.invalidApiKey = true;
        WidgetHome.apiKey="";

        /*Init method call, it will bring all the pre saved data*/
        WidgetHome.init = function () {
          WidgetHome.success = function (result) {
            console.info('init success result:', result);
            if (result) {
              WidgetHome.data = result.data;
              if (!WidgetHome.data.settings)
                WidgetHome.data.settings = {};
              WidgetHome.apiKey = WidgetHome.data.settings.apiKey;
              console.log("??????????????aa", result.data);
              var smoochApp = Smooch.init({
                appToken: WidgetHome.apiKey,
                customText: {headerText: WidgetHome.data.settings.headerText || "How can we help?"}
              });


              smoochApp.then(function(res){
                console.log("??????????????", res);
                if (res && res._id) {
                      WidgetHome.invalidApiKey = false;
                      Smooch.open();
                      $scope.$digest();
                    }
              },function(err){
                WidgetHome.invalidApiKey = true;
                console.log("??????????????e", err);
                Smooch.destroy();
                $scope.$digest();
              });

            }
          };
          WidgetHome.error = function (err) {
            if (err && err.code !== STATUS_CODE.NOT_FOUND) {
              console.error('Error while getting data', err);
            }
          };
          DataStore.get(TAG_NAMES.SMOOCH_CHAT_INFO).then(WidgetHome.success, WidgetHome.error);
        };
        WidgetHome.init();

        var onUpdateCallback = function (event) {

          setTimeout(function () {
            if (event) {
              WidgetHome.data = event.data;
              WidgetHome.apiKey = WidgetHome.data.settings.apiKey;
              var smoochApp = Smooch.init({
                appToken: WidgetHome.apiKey,
                customText: {headerText: WidgetHome.data.settings.headerText || "How can we help?"}
              });
              smoochApp.then(function(res){
                console.log("??????????????onUpdate", res);
                if (res && res._id) {
                  WidgetHome.invalidApiKey = false;
                  Smooch.open();
                  $scope.$digest();
                }
              },function(err){
                WidgetHome.invalidApiKey = true;
                console.log("??????????????e", err);
                Smooch.destroy();
                $scope.$digest();
              });
              $scope.$digest();
            }
          }, 0);
        };

        DataStore.onUpdate().then(null, null, onUpdateCallback);
      }]);
})(window.angular);
