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
var people_service_1 = require('../services/people.service');
//import * as _ from 'underscore';
var People = (function () {
    function People(_peopleService) {
        this._peopleService = _peopleService;
        this.peoples = [];
        this.pagedPosts = [];
        this.pageSize = 5;
    }
    People.prototype.ngOnInit = function () {
        console.log('here');
        this.loadPeople();
    };
    People.prototype.loadPeople = function () {
        var _this = this;
        this._peopleService.getPeoples()
            .subscribe(function (peoples) {
            _this.peoples = peoples;
            //console.log(peoples);
            //this.pagedPosts = _.take(this.peoples, this.pageSize);
        }, null, function () { _this.postsLoading = false; });
    };
    People.prototype.delete = function (id) {
        var _this = this;
        this._peopleService.deletePeoples(id)
            .subscribe(function (posts) {
            _this.loadPeople();
        }, function (error) { return console.error(error); }, function () { return console.log("Finished"); });
    };
    People = __decorate([
        core_1.Component({
            selector: 'people',
            templateUrl: 'people/templates/people.html',
            styleUrls: ['people/styles/people.css']
        }), 
        __metadata('design:paramtypes', [people_service_1.PeopleService])
    ], People);
    return People;
}());
exports.People = People;
