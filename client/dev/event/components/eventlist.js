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
var event_service_1 = require('../services/event.service');
var Eventlist = (function () {
    function Eventlist(_eventService) {
        this._eventService = _eventService;
        this.events = [];
        this.pagedPosts = [];
        this.pageSize = 5;
    }
    Eventlist.prototype.ngOnInit = function () {
        this.loadEvent();
    };
    Eventlist.prototype.loadEvent = function () {
        var _this = this;
        this._eventService.getEvents()
            .subscribe(function (events) {
            _this.events = events;
            // this.pagedPosts = _.take(this.events, this.pageSize);
        });
    };
    Eventlist = __decorate([
        core_1.Component({
            selector: 'eventlist',
            templateUrl: 'event/templates/eventlist.html',
            styleUrls: ['event/styles/eventlist.css']
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService])
    ], Eventlist);
    return Eventlist;
}());
exports.Eventlist = Eventlist;
