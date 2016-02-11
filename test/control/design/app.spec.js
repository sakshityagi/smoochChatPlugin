describe('Unit: smoochChatPluginDesign content app', function () {
    describe('Unit: app', function () {
        beforeEach(module('smoochChatPluginDesign'));
        var DesignHome, scope, $rootScope, $controller, Buildfire, TAG_NAMES, STATUS_CODE, LAYOUTS, STATUS_MESSAGES, q;
        beforeEach(inject(function (_$rootScope_, _$q_, _$controller_, _TAG_NAMES_, _STATUS_CODE_, _STATUS_MESSAGES_) {
            $rootScope = _$rootScope_;
            q = _$q_;
            scope = $rootScope.$new();
            $controller = _$controller_;
            TAG_NAMES = _TAG_NAMES_;
            STATUS_CODE = _STATUS_CODE_;
            STATUS_MESSAGES = _STATUS_MESSAGES_;
            Buildfire = {
                messaging: {
                    sendMessageToWidget: function (obj) {

                    }
                }
            }
        }));
        beforeEach(function () {
            DesignHome = $controller('DesignHomeCtrl', {
                $scope: scope,
                $q: q,
                Buildfire: Buildfire,
                TAG_NAMES: TAG_NAMES,
                STATUS_CODE: STATUS_CODE
            });
        });
        describe('It will test the defined methods', function () {
            it('It will test the defined methods of DesignHome.error(err) where err:code is null', function () {
                var err ={
                    code:null
                };
                DesignHome.error(err);
            });
        });


        describe('It will test the defined methods', function () {
            it('It will test the defined methods of DesignHome.error(err) where err:code is having status', function () {
                var err ={
                    code:STATUS_CODE.NOT_FOUND
                };
                DesignHome.error(err);
            });
        });

        describe('It will test the defined methods', function () {
            it('It will test the defined methods', function () {
                DesignHome.data = {
                    settings:{
                        "apiKey":"123",
                        "headerText":"test"
                    },
                    design:{
                        color:"ff00ff"
                    }
                };
                DesignHome.saveData();
            });

        });

        describe('It will test the defined methods', function () {
            it('It will test the defined methods of SettingsHome.gotToPage', function () {
                DesignHome.gotToPage();
            });

        });

        describe('It will call DesignHome.changeColor method', function () {
            it('DesignHome.changeColor calling', function () {
                DesignHome.saveDataCompletion = false;
                DesignHome.changeColor('ff00ff');
            });
        });
    })
});