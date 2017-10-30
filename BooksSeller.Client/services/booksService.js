(function () {
    "use strict";

    function booksService($http, appSettings) {
        return {
            get: function (id) {
                return $http.get(appSettings.serverPath + "/api/Books/" + id);
            },
            getAll: function () {
                return $http.get(appSettings.serverPath + "/api/Books/");
            },
            save: function (data) {
                return $http.post(appSettings.serverPath + "/api/Books/", JSON.stringify(data));
            },
            update: function (id, data) {
                return $http.put(appSettings.serverPath + "/api/Books/" + id, JSON.stringify(data));
            }
        }

        //return {
        //    get: $resource(appSettings.serverPath + "/api/Books/:id", null),
        //    getAll: $resource(appSettings.serverPath + "/api/Books", null),
        //    save: $resource(appSettings.serverPath + "/api/Books", null,
        //    {
        //        'save': { method: 'POST' }
        //    })
        //}
    }

    angular
        .module("booksSeller")
        .factory("booksService",
        ["$http", "appSettings",
            booksService]);
})();