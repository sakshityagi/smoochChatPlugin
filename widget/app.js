'use strict';

(function (angular) {
  angular.module('smoochChatPluginWidget', ['ui.bootstrap'])
    .controller('WidgetHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE','$rootScope',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE, $rootScope) {
        var WidgetHome = this;
        WidgetHome.data = null;
        WidgetHome.invalidApiKey = false;
        WidgetHome.apiKey = "";
        WidgetHome.instanceId;

        /*Init method call, it will bring all the pre saved data*/
        WidgetHome.init = function () {
            WidgetHome.updateColorTheme = false;
          WidgetHome.success = function (result) {
            console.info('init success result:', result);
            if (result) {
              WidgetHome.data = result.data;
              if (!WidgetHome.data.settings)
                WidgetHome.data.settings = {};
              if(!WidgetHome.data.design){
                WidgetHome.data.design = {};
                WidgetHome.data.design.color = '5d8aa8';
              }
              WidgetHome.apiKey = WidgetHome.data.settings.apiKey;
              Buildfire.spinner.show();
              Buildfire.getContext(function (err, data) {
                  var initObj = {
                      appToken: WidgetHome.apiKey,
                      customText: {headerText: WidgetHome.data.settings.headerText || "How can we help?"}
                  };
                  if(data && data.instanceId) {
                      WidgetHome.instanceId = data.instanceId;
                      initObj.userId = data.instanceId;
                  }
                  Smooch.on('message:sent', function(message) {
                      WidgetHome.className = "color-"+WidgetHome.data.design.color;
                      setTimeout(function(){
                          $('#sk-container').find('#sk-wrapper').find('.sk-msg').addClass(WidgetHome.className);
                      },0);
                  });
                      var smoochApp = Smooch.init(initObj);

                      smoochApp.then(function (res) {
                          Buildfire.spinner.hide();
                          if (res && res._id) {
                              WidgetHome.invalidApiKey = false;
                              $('#sk-header').click(function(event){
                                  event.stopPropagation();
                              });
                              $("#sk-footer form a").bind('taphold', function(event) {
                                  event.preventDefault();
                              });
                              WidgetHome.className = "color-"+WidgetHome.data.design.color;
                              $('#sk-container').find('#sk-wrapper').find('.sk-msg').removeClass(function (index, css) {
                                  return (css.match (/\bcolor-\S+/g) || []).join(' ');
                              });
                              $('#sk-container').find('#sk-wrapper').find('.sk-msg').addClass(WidgetHome.className);

                              Smooch.open();
                              $scope.$digest();
                          }


                      }, function (err) {
                          console.log("??????????????", err);
                          Buildfire.spinner.hide();
                          WidgetHome.invalidApiKey = true;
                          $scope.$digest();
                          Smooch.destroy();
                      });
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

          Buildfire.messaging.onReceivedMessage = function (event) {

              if (event && event.name == STATUS_CODE.UPDATED) {
                  /*$('.send').on('click', function (event) {
                      event.stopPropagation();
                      // execute a bunch of action to preform
                  });*/
                  WidgetHome.data.design.color = event.color;
                  var color = 'color-' + event.color;
//                  $('#sk-container').find('#sk-wrapper').find('.sk-msg').css('background', color);
                  $('#sk-container').find('#sk-wrapper').find('.sk-msg').removeClass(function (index, css) {
                      return (css.match(/\bcolor-\S+/g) || []).join(' ');
                  });
                  $('#sk-container').find('#sk-wrapper').find('.sk-msg').addClass(color);
                  $("#sk-footer form a").bind('taphold', function(event) {
                      event.preventDefault();
                  });
              }
          };
      }]);
})(window.angular);
