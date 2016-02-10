'use strict';

(function (angular) {
  angular.module('smoochChatPluginWidget', ['ui.bootstrap','smoochChatModals'])
    .run(function($window, $rootScope) {
        $rootScope.online = navigator.onLine;
        $window.addEventListener("offline", function () {
            $rootScope.$apply(function() {
                $rootScope.online = false;
            });
        }, false);
        $window.addEventListener("online", function () {
            $rootScope.$apply(function() {
                $rootScope.online = true;
            });
        }, false);
    })
    .controller('WidgetHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE','$rootScope','$modal','$timeout',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE, $rootScope,$modal,$timeout) {
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
                            if (!WidgetHome.data.design) {
                                WidgetHome.data.design = {};
                                WidgetHome.data.design.color = '5d8aa8';
                            }
                            WidgetHome.apiKey = WidgetHome.data.settings.apiKey;
                            Buildfire.spinner.show();
                            if(WidgetHome.apiKey)
                                initializeSmooch();
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

          function initializeSmooch() {
              Buildfire.getContext(function (err, data) {
                  var initObj = {
                      appToken: WidgetHome.apiKey,
                      customText: {headerText: WidgetHome.data.settings.headerText || "How can we help?"}
                  };
                  if (data && data.instanceId) {
                      WidgetHome.instanceId = data.instanceId;
                      initObj.userId = data.instanceId;
                  }
                  Smooch.on('message:sent', function (message) {
                      WidgetHome.className = "color-" + WidgetHome.data.design.color;
                      setTimeout(function () {
                          $('#sk-container').find('#sk-wrapper').find('.sk-msg').addClass(WidgetHome.className);
                      }, 0);
                  });
                  var smoochApp = Smooch.init(initObj);

                  smoochApp.then(function (res) {
                      Buildfire.spinner.hide();
                      if (res && res._id) {
                          WidgetHome.invalidApiKey = false;
                          $('#sk-header').click(function (event) {
                              event.stopPropagation();
                          });
                          $("#sk-footer form a").bind('taphold', function (event) {
                              event.preventDefault();
                          });
                          if (!WidgetHome.data.design) {
                              WidgetHome.data.design = {};
                              WidgetHome.data.design.color = '5d8aa8';
                          }
                          WidgetHome.className = "color-" + WidgetHome.data.design.color;
                          $('#sk-container').find('#sk-wrapper').find('.sk-msg').removeClass(function (index, css) {
                              return (css.match(/\bcolor-\S+/g) || []).join(' ');
                          });
                          $('#sk-container').find('#sk-wrapper').find('.sk-msg').addClass(WidgetHome.className);

                          Smooch.open();
                          $scope.$digest();
                      }


                  }, function (err) {
                      console.log("??????????????", err);
                      if (err && err.response && err.response.status == 401) {
                          Buildfire.spinner.hide();
                          WidgetHome.invalidApiKey = true;
                          $scope.$digest();
                      }
                      Smooch.destroy();
                  });
              });
          }

          Buildfire.messaging.onReceivedMessage = function (event) {
              switch (event && event.name) {
                  case STATUS_CODE.UPDATED :
                      WidgetHome.data = event.data;
                      var color = 'color-' + WidgetHome.data.design.color;
                      $('#sk-container').find('#sk-wrapper').find('.sk-msg').removeClass(function (index, css) {
                          return (css.match(/\bcolor-\S+/g) || []).join(' ');
                      });
                      $('#sk-container').find('#sk-wrapper').find('.sk-msg').addClass(color);
                      $("#sk-footer form a").bind('taphold', function (event) {
                          event.preventDefault();
                      });
                      break;
                  case STATUS_CODE.SETTINGS_UPDATED :
                      WidgetHome.data = event.data;
                      WidgetHome.apiKey = WidgetHome.data && WidgetHome.data.settings && WidgetHome.data.settings.apiKey;
                      if(WidgetHome.apiKey)
                        initializeSmooch();
                      break;
              }
          };

          $scope.$watch('online', function(newStatus) {
             if(newStatus){
                 $('.send').off("click");
                 if(WidgetHome && WidgetHome.data && WidgetHome.data.design && WidgetHome.data.design.color){
                     var color = 'color-' +  WidgetHome.data.design.color;
                     $('#sk-container').find('#sk-wrapper').find('.sk-msg').removeClass(function (index, css) {
                         return (css.match(/\bcolor-\S+/g) || []).join(' ');
                     });
                     $('#sk-container').find('#sk-wrapper').find('.sk-msg').addClass(color);
                 }
             }else{
                 $('.send').on("click", function (e) {

                     console.log('------------->INTERNET CONNECTION PROBLEM')
                     $modal
                         .open({
                             template: [
                                 '<div class="padded clearfix">',
                                 '<div class="content text-center">',
                                 '<p>No internet connection was found. please try again later</p>',
                                 '<a class="margin-zero"  ng-click="ok(option)">OK</a>',
                                 '</div>',
                                 '</div></div>'
                             ].join(''),
                             controller: 'MoreOptionsModalPopupCtrl',
                             controllerAs: 'MoreOptionsPopup',
                             size: 'sm'

                         });
                     $timeout(function(){
                         $('.modal').css('z-index',9999);
                         $('.modal-backdrop').css('z-index',9999);

                     },0);

                     e.stopPropagation();
                 });
             }
          });
      }]);
})(window.angular);
