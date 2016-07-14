'use strict';

(function (angular) {
  angular.module('smoochChatPluginWidget', ['ui.bootstrap', 'smoochChatModals'])
    .run(function ($window, $rootScope) {
      $rootScope.online = navigator.onLine;
      $window.addEventListener("offline", function () {
        $rootScope.$apply(function () {
          $rootScope.online = false;
        });
      }, false);
      $window.addEventListener("online", function () {
        $rootScope.$apply(function () {
          $rootScope.online = true;
        });
      }, false);
    })
    .controller('WidgetHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE', '$rootScope', '$modal', '$timeout',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE, $rootScope, $modal, $timeout) {
        var WidgetHome = this;
        WidgetHome.data = null;
        WidgetHome.invalidApiKey = false;
        WidgetHome.apiKey = "";
        WidgetHome.instanceId = null;
        WidgetHome.CHAT_TYPE = {
          PUBLIC: "Public",
          PRIVATE: "Private"
        };

        /*Init method call, it will bring all the pre saved data*/
        WidgetHome.init = function () {
          WidgetHome.updateColorTheme = false;
          WidgetHome.success = function (result) {
            console.info('init success result:', result);
            WidgetHome.data = {};
            if (result.data) {
              WidgetHome.data = result.data;
              if (!WidgetHome.data.settings)
                WidgetHome.data.settings = {};
              WidgetHome.apiKey = WidgetHome.data.settings.apiKey;
            }
            Buildfire.spinner.show();
            if (WidgetHome.apiKey)
              initializeSmooch();
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
            Buildfire.auth.getCurrentUser(function (err, user) {
              var smoochApp;
              console.log("_______________________", user);
              if (user) {
                initObj.givenName = user.displayName;
                initObj.email = user.email;
              }
              if (data && data.instanceId) {
                WidgetHome.instanceId = data.instanceId;
                initObj.userId = data.instanceId;
              }
              if (WidgetHome.data.settings && WidgetHome.data.settings.type === WidgetHome.CHAT_TYPE.PRIVATE) {
                if (user) {
                  initObj.userId = user._id;
                  smoochApp = Smooch.init(initObj)
                } else {
                  try {
                    var randomId = JSON.parse(localStorage.getItem('smoochUserRandomId'));
                  } catch (e) {
                    console.log("Error while parsing value: ", e);
                  }
                  console.log("****************", randomId);
                  if (randomId && randomId.id) {
                    initObj.userId = randomId.id;
                    smoochApp = Smooch.init(initObj)
                  }
                  else if (data && data.instanceId) {
                    initObj.userId = data.instanceId + Date.now() + Math.random();
                    localStorage.setItem('smoochUserRandomId', JSON.stringify({id: initObj.userId}));
                    smoochApp = Smooch.init(initObj)
                  }
                }
              } else {
                smoochApp = Smooch.init(initObj)
              }


              smoochApp && smoochApp.then(function (res) {
                Buildfire.spinner.hide();
                if (res && res._id) {
                  WidgetHome.invalidApiKey = false;
                  $('#sk-header').click(function (event) {
                    event.stopPropagation();
                  });
                  $("#sk-footer form a").bind('taphold', function (event) {
                    event.preventDefault();
                  });

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
          });
        }

        Buildfire.messaging.onReceivedMessage = function (event) {
          switch (event && event.name) {
            case STATUS_CODE.UPDATED :
              WidgetHome.data = event.data;
              $('#sk-header').click(function (event) {
                event.stopPropagation();
              });
              $("#sk-footer form a").bind('taphold', function (event) {
                event.preventDefault();
              });
              break;
            case STATUS_CODE.SETTINGS_UPDATED :
              WidgetHome.data = event.data;
              WidgetHome.apiKey = WidgetHome.data && WidgetHome.data.settings && WidgetHome.data.settings.apiKey;
              if (WidgetHome.apiKey)
                initializeSmooch();
              else
                Smooch.destroy();
              break;
          }
        };

        $scope.$watch('online', function (newStatus) {
          if (newStatus) {
            $('.send').off("click");
          } else {
            $('.send').on("click", function (e) {

              console.log('------------->INTERNET CONNECTION PROBLEM');
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
              $timeout(function () {
                $('.modal').css('z-index', 9999);
                $('.modal-backdrop').css('z-index', 9999);

              }, 0);

              e.stopPropagation();
            });
          }
        });

        var loginCallback = function () {
          if (WidgetHome.apiKey)
            initializeSmooch();
        };

        /**
         * onLogin() listens when user logins using buildfire.auth api.
         */
        Buildfire.auth.onLogin(loginCallback);


        /*
         * Enable pull down to refresh and fetch fresh data
         */

        buildfire.datastore.onRefresh(function () {
          if (WidgetHome.apiKey)
            initializeSmooch();
        });

      }]);
})(window.angular);
