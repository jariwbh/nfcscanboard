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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var PeopleService = (function () {
    function PeopleService(_http) {
        this._http = _http;
        this._url = "http://nfc-webui.azurewebsites.net/api/people/";
        this.token_val = localStorage.getItem('token');
    }
    // constructor(private _http: Http){
    //      var headers = new Headers({
    //          'Content-Type': 'application/json',
    //          'Authorization': 'Basic IiI=.eyJVSUQiOiIyIiwiTmFtZSI6InNhbmppdiIsIlVUeXBlIjoiVVR5cGUiLCJFeHAiOiIxNDc2NTEzOTE4Ljk2OTM0IiwiUm9sZSI6IkFkbWluIn0=.5mofl6klOoCSS6YT9UOhWzyIHoRcTcHV85juztzgM0I='
    //      });
    //      this._options = new RequestOptions({ headers: headers , body: {} });
    // }
    PeopleService.prototype.getPeoples = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + this.token_val);
        return this._http
            .get(this._url + 'PeopleList', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PeopleService.prototype.getPeople = function (id) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + this.token_val);
        return this._http.get(this._url + 'peoplebyid/' + id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PeopleService.prototype.createPeoples = function (post) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + this.token_val);
        return this._http.post(this._url + 'Add', JSON.stringify(post), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PeopleService.prototype.updatePeoples = function (post) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + this.token_val);
        return this._http.post(this._url + 'Update', JSON.stringify(post), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PeopleService.prototype.deletePeoples = function (id) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + this.token_val);
        return this._http.get(this._url + 'delete/' + id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PeopleService.prototype.getPeopleDetails = function (id) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + this.token_val);
        return this._http.get(this._url + 'delete/' + id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PeopleService.ENDPOINT = '/api/todos/:id';
    PeopleService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PeopleService);
    return PeopleService;
}());
exports.PeopleService = PeopleService;
