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
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var platform_browser_1 = require('@angular/platform-browser');
var shared_module_1 = require('./shared/shared.module');
var report_module_1 = require('./report/report.module');
var import_module_1 = require('./import/import.module');
var people_module_1 = require('./people/people.module');
var user_module_1 = require('./user/user.module');
var event_module_1 = require('./event/event.module');
var login_module_1 = require('./login/login.module');
var todo_cmp_1 = require('./todo/components/todo-cmp');
var home_component_1 = require('./home/components/home.component');
var myheader_1 = require('./myheader/components/myheader');
var footer_1 = require('./myfooter/components/footer');
var sidebar_1 = require('./mysidebar/components/sidebar');
var notfound_1 = require('./notfound/components/notfound');
var todo_service_1 = require('./todo/services/todo-service');
var report_routing_1 = require('./report/report.routing');
var import_routing_1 = require('./import/import.routing');
var people_routing_1 = require('./people/people.routing');
var user_routing_1 = require('./user/user.routing');
var event_routing_1 = require('./event/event.routing');
var login_routing_1 = require('./login/login.routing');
var app_routing_1 = require('./app.routing');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                shared_module_1.SharedModule,
                import_module_1.ImportModule,
                report_module_1.ReportModule,
                people_module_1.PeopleModule,
                user_module_1.UserModule,
                event_module_1.EventModule,
                login_module_1.LoginModule,
                import_routing_1.importRouting,
                report_routing_1.reportRouting,
                people_routing_1.peopleRouting,
                user_routing_1.userRouting,
                event_routing_1.eventRouting,
                login_routing_1.loginRouting,
                app_routing_1.routing
            ],
            declarations: [
                todo_cmp_1.TodoCmp,
                myheader_1.Myheader,
                sidebar_1.Sidebar,
                footer_1.Footer,
                home_component_1.HomeComponent,
                notfound_1.Notfound
            ],
            providers: [
                todo_service_1.TodoService,
            ],
            bootstrap: [todo_cmp_1.TodoCmp],
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
