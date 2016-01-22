'use strict';

(function (angular,buildfire) {
    angular.module('smoochChatPluginSettings', ['ui.bootstrap'])
        .controller('SettingsHomeCtrl',['$scope', 'Buildfire',function($scope, Buildfire){
            var SettingsHome = this;
            SettingsHome.helloWorld = 'Hello World';

        }])
})(window.angular,window.buildfire);