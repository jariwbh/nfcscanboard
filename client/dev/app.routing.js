"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home/components/home.component');
var notfound_1 = require('./notfound/components/notfound');
exports.routing = router_1.RouterModule.forRoot([
    { path: '', component: home_component_1.HomeComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'not-found', component: notfound_1.Notfound },
    { path: '**', redirectTo: 'not-found' }
]);
