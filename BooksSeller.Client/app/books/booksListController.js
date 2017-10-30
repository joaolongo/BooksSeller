(function () {
    "use strict";

    function booksListController($scope, booksService, bookEditService) {
        var vm = this;

        booksService.getAll().then(function (response) {
            vm.books = response.data;
        });

        vm.editBook = function (id) {

            bookEditService.setBook(id);

            $scope.$parent.swapMode();
        }
    }

    angular
        .module("booksSeller")
        .controller("booksListController",
        ["$scope", "booksService", "bookEditService", booksListController]);
}());