"use strict";
var router_1 = require('@angular/router');
var Eventlist_1 = require('./components/Eventlist');
var Eventdetail_1 = require('./components/Eventdetail');
var Eventschedule_1 = require('./components/Eventschedule');
var Eventform_1 = require('./components/Eventform');
exports.eventRouting = router_1.RouterModule.forChild([
    { path: 'eventlists', component: Eventlist_1.Eventlist },
    { path: 'eventdetails', component: Eventdetail_1.Eventdetail },
    { path: 'eventschedule', component: Eventschedule_1.Eventschedule },
    { path: 'eventForm/:id', component: Eventform_1.Eventform },
    { path: 'eventForm/new', component: Eventform_1.Eventform }
]);
