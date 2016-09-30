"use strict";
var MyService = (function () {
    function MyService() {
    }
    MyService.prototype.doStuff = function () {
        return 1;
    };
    return MyService;
}());
exports.MyService = MyService;
