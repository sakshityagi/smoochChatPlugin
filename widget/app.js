'use strict';

(function (angular) {
  angular.module('smoochChatPluginWidget', ['ui.bootstrap'])
    .controller('WidgetHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE','$rootScope',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE, $rootScope) {
        var WidgetHome = this;
        WidgetHome.data = null;
        WidgetHome.invalidApiKey = false;
        WidgetHome.apiKey = "";

        /*Init method call, it will bring all the pre saved data*/
        WidgetHome.init = function () {
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
              var smoochApp = Smooch.init({
                appToken: WidgetHome.apiKey,
                customText: {headerText: WidgetHome.data.settings.headerText || "How can we help?"}
              });
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
                  WidgetHome.className = "color-"+WidgetHome.data.design.color
                  $('#sk-holder #sk-container #sk-conversation .sk-row.sk-right-row .sk-msg').removeClass(function (index, css) {
                    return (css.match (/\color-\S+/g) || []).join(' ');
                  });
                  $('#sk-holder #sk-container #sk-conversation .sk-row.sk-right-row .sk-msg').addClass(WidgetHome.className);

                  Smooch.open();
                  $scope.$digest();
                }

                Smooch.on('message:sent', function(message) {
                  WidgetHome.className = "color-"+WidgetHome.data.design.color
                  setTimeout(function(){
                    $('#sk-holder #sk-container #sk-conversation .sk-row.sk-right-row .sk-msg').addClass(WidgetHome.className);

                  },0);
               });

              }, function (err) {
                console.log("??????????????", err);
                Buildfire.spinner.hide();
                WidgetHome.invalidApiKey = true;
                $scope.$digest();
                Smooch.destroy();
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

        WidgetHome.onUpdateCallback = function (event) {
          setTimeout(function () {
            if (event) {
              WidgetHome.data = event.data;
              WidgetHome.apiKey = WidgetHome.data.settings.apiKey;
              Buildfire.spinner.show();
              var smoochApp = Smooch.init({
                appToken: WidgetHome.apiKey,
                customText: {headerText: WidgetHome.data.settings.headerText || "How can we help?"}
              });
              smoochApp.then(function (res) {
                console.log("??????????????onUpdate", res);
                Buildfire.spinner.hide();
                if (res && res._id) {
                  WidgetHome.invalidApiKey = false;
                  $('#sk-header').click(function(event){
                    event.stopPropagation();
                  });
                    $("#sk-footer form a").bind('taphold', function(event) {
                        event.preventDefault();
                    });
                  $('.send').off('click');
                  if(WidgetHome.data.design == undefined){
                    WidgetHome.data.design = {};

                    WidgetHome.data.design.color = "5d8aa8";
                  }
                  WidgetHome.className = "color-"+WidgetHome.data.design.color ||"5d8aa8";
                  $('#sk-holder #sk-container #sk-conversation .sk-row.sk-right-row .sk-msg').removeClass(function (index, css) {
                    return (css.match (/\color-\S+/g) || []).join(' ');
                  });
                  $('#sk-holder #sk-container #sk-conversation .sk-row.sk-right-row .sk-msg').addClass(WidgetHome.className);
                  Smooch.open();
                  $scope.$digest();
                }
                Smooch.on('message:sent', function(message) {
                  WidgetHome.className = "color-"+WidgetHome.data.design.color;
                  setTimeout(function(){
                    $('#sk-holder #sk-container #sk-conversation .sk-row.sk-right-row .sk-msg').addClass(WidgetHome.className);

                  },0);
                });
              }, function (err) {
                WidgetHome.invalidApiKey = true;
                console.log("??????????????e", err);
                Buildfire.spinner.hide();
                $scope.$digest();
                Smooch.destroy();
              });
              $scope.$digest();
            }
          }, 0);
        };

          DataStore.onUpdate().then(null, null, WidgetHome.onUpdateCallback);

          Buildfire.messaging.onReceivedMessage = function (event) {

              if (event && event.name == STATUS_CODE.UPDATED) {
                  $('.send').on('click', function (event) {
                      event.stopPropagation();
                      // execute a bunch of action to preform
                  });
                  $("#sk-footer form a").bind('taphold', function(event) {
                      event.preventDefault();
                  });
              }
          };
      }]);
})(window.angular);
