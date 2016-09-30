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
var router_1 = require('@angular/router');
var login_service_1 = require('../services/login.service');
var login_model_1 = require('../models/login.model');
var Login = (function () {
    function Login(_LoginService, _LoginModel, _router) {
        this._LoginService = _LoginService;
        this._LoginModel = _LoginModel;
        this._router = _router;
        this.checking_auth = false;
        this.auth_error = "";
        this.error_auth = false;
        localStorage.removeItem('token');
        this.token = localStorage.getItem('token');
    }
    Login.prototype.onSubmit = function (value) {
        var _this = this;
        this.checking_auth = true;
        this._LoginModel.UserName = value.username;
        this._LoginModel.UserKey = value.password;
        console.log(value);
        console.log(value.username);
        console.log(value.password);
        this._LoginService.checkLogin(this._LoginModel)
            .subscribe(function (posts) {
            console.log(posts);
            _this.token = posts.Token;
            localStorage.setItem('token', _this.token);
            _this._router.navigate(['../home']);
        }, function (response) {
            if (response.status == 404) {
                _this.error_auth = true;
                _this.auth_error = "Wrong Username or password .";
                _this.checking_auth = false;
            }
        });
    };
    Login = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'login/templates/login.html',
            styleUrls: ['login/styles/login.css']
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, login_model_1.LoginModel, router_1.Router])
    ], Login);
    return Login;
}());
exports.Login = Login;
