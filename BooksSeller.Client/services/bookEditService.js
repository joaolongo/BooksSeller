(function () {
    "use strict";

    function bookEditService() {
        return {
            bookId: 0,
            setBook: function (id) {
                this.bookId = id;
            },
            getBook: function () {
                return this.bookId;
            },
            clearBook: function () {
                this.bookId = 0;
            },
            isEdition: function () {
                return this.bookId > 0;
            }
        }
    }

    angular
        .module("booksSeller")
        .factory("bookEditService",
        bookEditService);
})();