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
var Eventlist_1 = require('./components/Eventlist');
var Eventdetail_1 = require('./components/Eventdetail');
var Eventschedule_1 = require('./components/Eventschedule');
var Eventform_1 = require('./components/Eventform');
var event_service_1 = require('./services/event.service');
var events_model_1 = require('./models/events.model');
var EventModule = (function () {
    function EventModule() {
    }
    EventModule = __decorate([
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
                Eventlist_1.Eventlist,
                Eventdetail_1.Eventdetail,
                Eventschedule_1.Eventschedule,
                Eventform_1.Eventform
            ],
            exports: [
                Eventlist_1.Eventlist,
                Eventdetail_1.Eventdetail,
                Eventschedule_1.Eventschedule,
                Eventform_1.Eventform
            ],
            providers: [
                event_service_1.EventService,
                events_model_1.EventModel
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], EventModule);
    return EventModule;
}());
exports.EventModule = EventModule;
