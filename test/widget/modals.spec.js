describe('smoochChatPluginWidget: Services', function () {

    var Buildfire, $modal, $q, $scope, MoreOptionsModalPopupCtrl, $modalInstance, Info, $rootScope, SocialDataStore, Buildfire;
    beforeEach(module('smoochChatModals'));

    beforeEach(inject(function ($rootScope, $controller, _$modal_, _$q_) {
        $scope = $rootScope.$new();
        $modal = _$modal_;
        $q = _$q_;
        /*   MoreOptionsModalPopupCtrl = $controller('MoreOptionsModalPopupCtrl', {
         scope : scope
         });*/

        $modalInstance = { // Create a mock object using spies
            close: jasmine.createSpy('modalInstance.close'),
            dismiss: jasmine.createSpy('modalInstance.dismiss')
        };
        MoreOptionsModalPopupCtrl = $controller('MoreOptionsModalPopupCtrl', {
            $scope: $scope,
            $modalInstance:$modalInstance,
            $rootScope:$rootScope
        });

    }));

    describe('Modals: MoreOptionsModalPopup Controller', function () {
        it('MoreOptionsModalPopupCtrl should exists', function () {
            expect(MoreOptionsModalPopupCtrl).toBeDefined();
        });
        it('$scope.cancel should exists', function () {
            console.log('$$$$$$$$$$$$', $scope.cancel);
            $scope.cancel();
            expect($scope.cancel).toBeDefined();
        });
        it('$scope.ok should exists', function () {
            $scope.ok();
            expect($scope.ok).toBeDefined();
        });
    });

});