(function () {
    "use strict";

    angular
        .module("common.services",
        ["ngResource", "ngMessages", 'ng-currency'])
        .constant("appSettings",
        {
            serverPath: "http://localhost:46667"
        });
}());
