(function () {
    "use strict";

    function mainController($scope, $rootScope) {
        $rootScope.currency = 'R$'; // Default currency

        var vm = this;
        vm.editionMode = false;
        
        $scope.swapMode = function swapMode() {
            vm.editionMode = !vm.editionMode;
        }
    }

    angular
        .module("booksSeller")
        .controller("mainController",
            ["$scope", "$rootScope", mainController]);
})();