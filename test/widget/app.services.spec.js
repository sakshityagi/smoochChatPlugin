describe('Unit: smoochChatPluginWidget: Services', function () {
    beforeEach(module('smoochChatPluginWidget'));


  describe('Unit : Buildfire service', function () {
    var Buildfire;
    beforeEach(inject(
        function (_Buildfire_) {
          Buildfire = _Buildfire_;
        }));
    it('Buildfire should exists', function () {
      expect(Buildfire).toBeDefined();
    });
  });

  describe('Unit : DataStore Factory', function () {
    var DataStore, Buildfire, STATUS_MESSAGES, STATUS_CODE, q, TAG_NAMES, $rootScope;
    beforeEach(module('smoochChatPluginWidget', function ($provide) {
      $provide.service('Buildfire', function () {
        this.datastore = jasmine.createSpyObj('datastore', ['get', 'onUpdate', 'clearListener']);
        this.datastore.get.and.callFake(function (_tagName, callback) {
          if (_tagName) {
            callback(null, 'Success');
          } else {
            callback('Error', null);
          }
        });

          this.datastore.onUpdate.and.callFake(function (callback) {

              callback(null, 'Success');

          });

          this.datastore.clearListener.and.callFake(function () {

              callback(null, 'Success');

          });
      });
    }));


    beforeEach(module('smoochChatPluginWidget'));
    beforeEach(inject(function (_DataStore_, _STATUS_CODE_, _STATUS_MESSAGES_, _TAG_NAMES_, _$rootScope_) {
      DataStore = _DataStore_;
      STATUS_CODE = _STATUS_CODE_;
      STATUS_MESSAGES = _STATUS_MESSAGES_;
      TAG_NAMES = _TAG_NAMES_;
      $rootScope = _$rootScope_;
      Buildfire = {
        datastore: {}
      };


    }));
  it('DataStore should exist and be an object', function () {
    expect(typeof DataStore).toEqual('object');
  });
  it('DataStore.get should exist and be a function', function () {
    expect(typeof DataStore.get).toEqual('function');
  });

    it('DataStore.get should return error', function () {
      var result = ''
          , success = function (response) {
            result = response;
          }
          , error = function (err) {
            result = err;
          };
      DataStore.get(null).then(success, error);
      $rootScope.$digest();
      expect(result).toEqual('Error');
    });
    it('DataStore.get should return success', function () {
      var result = ''
          , success = function (response) {
            result = response;
          }
          , error = function (err) {
            result = err;
          };
      DataStore.get(TAG_NAMES.SMOOCH_CHAT_INFO).then(success, error);
      $rootScope.$digest();
      expect(result).toEqual('Success');
    });


      it('DataStore.onUpdate should return error', function () {
          var result = ''
              , success = function (response) {
                  result = response;
              }
              , error = function (err) {
                  result = err;
              };
          DataStore.onUpdate().then(success, error);
          $rootScope.$digest();
          expect(result).toEqual('');
      });


      it('DataStore.clearListener should call', function () {
          DataStore.clearListener()
          $rootScope.$digest();
      });
  })

});