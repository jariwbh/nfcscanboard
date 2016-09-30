"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var userdetails_service_1 = require('../services/userdetails.service');
var Userlist = (function () {
    function Userlist(_userService) {
        this._userService = _userService;
        this.users = [];
        this.deleteFlag = false;
        this.pagedPosts = [];
        this.pageSize = 5;
    }
    Userlist.prototype.ngOnInit = function () {
        this.GetUserList();
    };
    Userlist.prototype.GetUserList = function () {
        var _this = this;
        this._userService.getUsers()
            .subscribe(function (users) {
            _this.users = users;
            // this.pagedPosts = _.take(this.users, this.pageSize);
        }, null, function () { _this.postsLoading = false; });
    };
    Userlist.prototype.GetUserDetail = function () {
        console.log('edit');
    };
    Userlist.prototype.DeleteUser = function (id) {
        var _this = this;
        this._userService.DeleteUser(id)
            .subscribe(function (posts) {
            _this.GetUserList();
        }, function (error) { return console.error(error); }, function () { return console.log("Finished"); });
    };
    Userlist = __decorate([
        core_1.Component({
            selector: 'userlist',
            templateUrl: 'user/templates/userlist.html',
            styleUrls: ['user/styles/userlist.css']
        }), 
        __metadata('design:paramtypes', [userdetails_service_1.UserdetailsService])
    ], Userlist);
    return Userlist;
}());
exports.Userlist = Userlist;
