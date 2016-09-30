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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var shared_module_1 = require('../shared/shared.module');
var people_1 = require('./components/people');
var Peopleform_1 = require('./components/Peopleform');
var Peopletoevent_1 = require('./components/Peopletoevent');
var people_service_1 = require('./services/people.service');
var event_service_1 = require('../event/services/event.service');
var people_model_1 = require('./models/people.model');
var PeopleModule = (function () {
    function PeopleModule() {
    }
    PeopleModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule,
                shared_module_1.SharedModule,
                http_1.HttpModule
            ],
            declarations: [
                people_1.People,
                Peopleform_1.Peopleform,
                Peopletoevent_1.Peopletoevent
            ],
            exports: [
                people_1.People,
                Peopleform_1.Peopleform,
                Peopletoevent_1.Peopletoevent
            ],
            providers: [
                people_service_1.PeopleService,
                event_service_1.EventService,
                people_model_1.PeopleModel
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], PeopleModule);
    return PeopleModule;
}());
exports.PeopleModule = PeopleModule;
