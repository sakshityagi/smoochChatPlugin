describe('Unit: smoochChatPluginWidget app', function () {
  describe('Unit: app', function () {
    beforeEach(module('smoochChatPluginWidget'));
    var location, route, rootScope;
    beforeEach(inject(function () {

    }));
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

      it('it should pass if WidgetHome.init is called for success', function () {
        var result = {};
        WidgetHome.init();
        WidgetHome.success()
      });
      it('it should pass if WidgetHome.init is called for error', function () {
        WidgetHome.init();
        WidgetHome.error()
      });

      it('it should pass if  WidgetHome.onUpdateCallback is called', function () {
        var event = {
          tag: TAG_NAMES.SMOOCH_CHAT_INFO
        };
        WidgetHome.data = {
          design: ""
        };
        WidgetHome.onUpdateCallback(event);
      });
    });
  });
});