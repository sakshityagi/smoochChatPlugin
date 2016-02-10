
(function (angular, buildfire) {
    'use strict';
    if (!buildfire) {
        throw ("buildfire not found");
    }
    angular
        .module('smoochChatModals', ['ui.bootstrap'])
        .controller('MoreOptionsModalPopupCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
            console.log('MoreOptionsModalPopup Controller called-----');

            $scope.ok = function (option) {
                $modalInstance.close(option);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('no');
            };

        }])
})(window.angular, window.buildfire);
