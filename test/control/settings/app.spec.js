describe('Unit: smoochChatPluginSettings content app', function () {
  describe('Unit: app', function () {
    beforeEach(module('smoochChatPluginSettings'));
    var location, route, rootScope;
    beforeEach(inject(function () {

    }));
    var SettingsHome, scope, $rootScope, $controller, Buildfire, ActionItems, TAG_NAMES, STATUS_CODE, LAYOUTS, STATUS_MESSAGES, CONTENT_TYPE, q;

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
      ActionItems = jasmine.createSpyObj('ActionItems', ['showDialog'])

    }));

    beforeEach(function () {
      SettingsHome = $controller('SettingsHomeCtrl', {
        $scope: scope,
        $q: q,
        Buildfire: Buildfire,
        TAG_NAMES: TAG_NAMES,
        ActionItems: ActionItems,
        STATUS_CODE: STATUS_CODE,
        CONTENT_TYPE: CONTENT_TYPE
      });
    });


    describe('It will test the defined methods', function () {
      it('It will test the defined methods of SettingsHome.error(err) where err:code is null', function () {
        var err ={
          code:null
        };
        SettingsHome.error(err);
      });
    });


    describe('It will test the defined methods', function () {
      it('It will test the defined methods of SettingsHome.error(err) where err:code is having status', function () {
        var err ={
          code:STATUS_CODE.NOT_FOUND
        };
        SettingsHome.error(err);
      });
    });

    describe('It will test the defined methods', function () {
      it('It will test the defined methods', function () {
        SettingsHome.data = {
          settings:{
            "apiKey":"123",
            "headerText":"test"
          }
        };
        SettingsHome.saveData();
        SettingsHome.saveApi();
      });

    });

    describe('It will test the defined methods', function () {
      it('It will test the defined methods of SettingsHome.gotToPage', function () {
        SettingsHome.gotToPage();
      });

    });
  })
  });