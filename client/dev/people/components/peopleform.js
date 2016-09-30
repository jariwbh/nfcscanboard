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
var people_service_1 = require('../services/people.service');
var event_service_1 = require('../../event/services/event.service');
var people_model_1 = require('../models/people.model');
var Peopleform = (function () {
    function Peopleform(fb, _router, _route, _peopleService, _eventService, _PeopleModel) {
        var _this = this;
        this._router = _router;
        this._route = _route;
        this._peopleService = _peopleService;
        this._eventService = _eventService;
        this._PeopleModel = _PeopleModel;
        this.people = new people_model_1.PeopleModel();
        this.events = [];
        this.form = fb.group({
            name: ['', forms_1.Validators.required],
            email: ['', basicValidators_1.BasicValidators.email],
            phone: []
        });
        this._eventService.getEvents()
            .subscribe(function (events) {
            _this.events = events;
        });
    }
    Peopleform.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._route.params.subscribe(function (params) {
            var id = +params["id"];
            _this.title = id ? "Edit People" : "New People";
            if (!id)
                return;
            _this._peopleService.getPeople(id)
                .subscribe(function (peoples) {
                _this.people = peoples;
                _this.selectedvalue = _this.people['EventId'];
                //console.log(this.selectedvalue);
            });
        });
    };
    Peopleform.prototype.onEventchange = function (Value) {
        this.event_temp = Value;
    };
    Peopleform.prototype.onGenderchange = function (Value) {
        this.gender_temp = Value;
    };
    Peopleform.prototype.onSubmit = function (value) {
        var _this = this;
        this._PeopleModel.Name = value.name;
        this._PeopleModel.Email = value.email;
        this._PeopleModel.Phone = value.phone;
        this._PeopleModel.Gender = "MALE";
        this._PeopleModel.ContactPreferenceID = '1';
        this._PeopleModel.EventId = this.event_temp;
        this._PeopleModel.Modified = '1';
        console.log(this.event_temp);
        var result;
        if (this.people.ID) {
            this._PeopleModel.ID = this.people.ID;
            if (!this.event_temp) {
                this._PeopleModel.EventId = this.people.EventId;
            }
            result = this._peopleService.updatePeoples(this._PeopleModel);
        }
        else {
            result = this._peopleService.createPeoples(this._PeopleModel);
        }
        result.subscribe(function (posts) {
            _this._router.navigate(['peoplelists']);
        }, function (error) { return console.error(error); }, function () { return console.log("Finished"); });
    };
    Peopleform = __decorate([
        core_1.Component({
            selector: 'peopleform',
            templateUrl: 'people/templates/peopleform.html',
            styleUrls: ['people/styles/peopleform.css']
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, router_1.ActivatedRoute, people_service_1.PeopleService, event_service_1.EventService, people_model_1.PeopleModel])
    ], Peopleform);
    return Peopleform;
}());
exports.Peopleform = Peopleform;
