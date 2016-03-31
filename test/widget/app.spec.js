describe('Unit: smoochChatPluginWidget app', function () {
  describe('Unit: app', function () {
    beforeEach(module('smoochChatPluginWidget'));
    var location, route, rootScope;
    var WidgetHome, scope, $rootScope, $controller, Buildfire, TAG_NAMES, STATUS_CODE, STATUS_MESSAGES, CONTENT_TYPE, q;

    beforeEach(inject(function (_$rootScope_, _$q_, _$controller_, _TAG_NAMES_, _STATUS_CODE_, _STATUS_MESSAGES_) {
      $rootScope = _$rootScope_;
      q = _$q_;
      scope = $rootScope.$new();
      $controller = _$controller_;
      TAG_NAMES = _TAG_NAMES_;
      STATUS_CODE = _STATUS_CODE_;
      STATUS_MESSAGES = _STATUS_MESSAGES_;
      Buildfire = {
        components: {
          carousel: {
            editor: function (name) {
              return {}
            },
            viewer: function (name) {
              return {}
            }
          }

        }, spinner: {
          hide: function () {
            return {}
          },
          show: function () {
            return {}
          }

        }, messaging: {
              onReceivedMessage: function (eventObj) {

              }
          }, getContext: function (cb) {

          },
        auth : {
          onLogin : function(){

          }
        }

      };
    }));

    beforeEach(function () {
      WidgetHome = $controller('WidgetHomeCtrl', {
        $scope: scope,
        $q: q,
        Buildfire: Buildfire,
        TAG_NAMES: TAG_NAMES,
        STATUS_CODE: STATUS_CODE,
        CONTENT_TYPE: CONTENT_TYPE
      });
    });
    describe('It will test the defined methods', function () {

      it('it should pass if WidgetHome.init is called for success having no settings object', function () {
        var result = {data: {}};
        WidgetHome.init();
        WidgetHome.success(result);
      });
        it('it should pass if WidgetHome.init is called for success having settings apiKey', function () {
            var result = {data: {settings: {apiKey: 'safds3433dfsfa'}}};
            WidgetHome.init();
            WidgetHome.success(result);
        });
      it('it should pass if WidgetHome.init is called for error', function () {
        WidgetHome.init();
        WidgetHome.error()
      });

      it('it should pass if WidgetHome.success is called for error', function () {
        WidgetHome.data = null;
        var result = {data:{
          settings:"hi"
         }
        };
        WidgetHome.data = result;
        WidgetHome.init();
        WidgetHome.success(result);
       });
      it('It will test the defined methods of WidgetHome.error(err) where err:code is having status', function () {
        var err ={
          code:null
        };
        WidgetHome.error(err);
      });
        it('It will trigger buildfire.messaging.onReceiveMessage with STATUS_CODE.SETTINGS_UPDATED', function () {
            var eventObj = {name: STATUS_CODE.SETTINGS_UPDATED, data: {settings: {apiKey: 'skdf34ljsdjl'}}};
            Buildfire.messaging.onReceivedMessage(eventObj);
        });
        it('It will trigger buildfire.messaging.onReceiveMessage with STATUS_CODE.UPDATED', function () {
            var eventObj = {name: STATUS_CODE.UPDATED, data: {settings: {apiKey: 'skdf34ljsdjl'}}};
            Buildfire.messaging.onReceivedMessage(eventObj);
        });
        it('It will trigger $watch', function () {
            scope.$digest();
        });
    });
  });
});