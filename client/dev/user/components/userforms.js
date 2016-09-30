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
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var basicValidators_1 = require('../../shared/components/basicValidators');
var userdetails_service_1 = require('../services/userdetails.service');
var user_model_1 = require('../models/user.model');
var Userforms = (function () {
    function Userforms(fb, _router, _route, _userService, _userModel) {
        this._router = _router;
        this._route = _route;
        this._userService = _userService;
        this._userModel = _userModel;
        this.user = new user_model_1.UserModel();
        this.events = [];
        this.form = fb.group({
            username: ['', forms_1.Validators.required],
            email: ['', basicValidators_1.BasicValidators.email],
        });
    }
    Userforms.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._route.params.subscribe(function (params) {
            var id = +params["id"];
            _this.title = id ? "Edit User" : "New User";
            if (!id)
                return;
            _this._userService.getUser(id)
                .subscribe(function (users) {
                _this.user = users;
            });
        });
    };
    Userforms.prototype.onSubmit = function (value) {
        var _this = this;
        this._userModel.UserName = value.username;
        this._userModel.Email = value.email;
        this._userModel.UserKey = value.password;
        this._userModel.RoleID = 1;
        this._userModel.Modified = 654839;
        this._userModel.PIN = value.pin;
        var result;
        if (this.user.ID) {
            this._userModel.ID = this.user.ID;
            result = this._userService.UpdateUser(this._userModel);
        }
        else {
            result = this._userService.createUsers(this._userModel);
        }
        result.subscribe(function (posts) {
            _this._router.navigate(['userlists']);
        }, function (error) { return console.error(error); }, function () { return console.log("Finished"); });
    };
    Userforms = __decorate([
        core_1.Component({
            selector: 'userforms',
            templateUrl: 'user/templates/userforms.html',
            styleUrls: ['user/styles/userforms.css']
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, router_1.ActivatedRoute, userdetails_service_1.UserdetailsService, user_model_1.UserModel])
    ], Userforms);
    return Userforms;
}());
exports.Userforms = Userforms;
