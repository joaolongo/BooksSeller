(function () {
    "use strict";

    function booksEditController($scope, booksService, bookEditService) {
        var vm = this;
        vm.book = {};
        vm.originalBook = {};
        vm.title = '';
        vm.message = '';

        if (bookEditService.isEdition())
            booksService.get(bookEditService.getBook()).then(function (response) {
                vm.book.Id = response.data.Id;
                vm.book.Code = response.data.Code;
                vm.book.Title = response.data.Title;
                vm.book.ReleaseDate = new Date(response.data.ReleaseDate);
                vm.book.Price = response.data.Price;
            });

        if (vm.book && vm.book.code) {
            vm.title = "Edit: " + vm.book.title;
        }
        else {
            vm.title = "New Book";
        }

        vm.submit = function (isValid) {
            if (isValid) {
                vm.message = '';
                if (vm.book.Id && vm.book.Id > 0) {
                    booksService.update(vm.book.Id, vm.book).then(function (response) {

                        bookEditService.clearBook();

                        $scope.$parent.swapMode();
                    });
                } else {
                    booksService.save(vm.book).then(function (response) {
                        $scope.$parent.swapMode();
                    });
                }
            }
            else
                alert("Form is invalid!")
        };

        vm.cancel = function (editForm) {
            bookEditService.clearBook();

            editForm.$setPristine();
            vm.product = angular.copy(vm.originalBook);
            vm.message = '';

            $scope.$parent.swapMode();
        };

    }

    angular
        .module("booksSeller")
        .controller("booksEditController",
        ["$scope", "booksService", "bookEditService", booksEditController]);
}());
