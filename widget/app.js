'use strict';

(function (angular) {
  angular.module('smoochChatPluginWidget', ['ui.bootstrap'])
    .controller('WidgetHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE) {
        var WidgetHome = this;
        WidgetHome.data = {};
        WidgetHome.helloWorldWidget = "Hello World Widget";
        /*Init method call, it will bring all the pre saved data*/
        WidgetHome.init = function () {
          WidgetHome.success = function (result) {
            console.info('init success result:', result);
            if (result) {

              WidgetHome.data = result.data;
              console.log("aaaaaaaaaaaaaaaa",WidgetHome.data);
              if (!WidgetHome.data.settings)
                WidgetHome.data.settings = {};
              WidgetHome.apiKey = WidgetHome.data.settings.apiKey;
              var a = Smooch.init({appToken: WidgetHome.apiKey});
              console.log("aaaaaaaaaaaaaa",a);
               Smooch.open();
            }
          };
          WidgetHome.error = function (err) {
            if (err && err.code !== STATUS_CODE.NOT_FOUND) {
              console.error('Error while getting data', err);
            }
          };
          DataStore.get(TAG_NAMES.SMOOCH_CHAT_DATA).then(WidgetHome.success, WidgetHome.error);
        };
        WidgetHome.init();

        var onUpdateCallback = function (event) {

          setTimeout(function () {
            if (event) {
              WidgetHome.data = event.data;
              WidgetHome.apiKey = WidgetHome.data.settings.apiKey;
              setTimeout(function () {
                var response = Smooch.init({appToken: WidgetHome.apiKey});
                // console.log("aaaaaaaaaaaaaa", response, response.q, response._d.s)
                if (response._d.s == 2) {
                  console.log("aaaaaaaaaaa", response._d.s);
                  Smooch.close();
                  Smooch.destroy();
                } else {
                  // Smooch.destroy();
                  console.log("aaaaaaaaaaa", response._d.s);
                  Smooch.open();
                }
              },1000);
              $scope.$digest();
            }
          }, 0);
        };

        DataStore.onUpdate().then(null, null, onUpdateCallback);
    }]);
})(window.angular);
