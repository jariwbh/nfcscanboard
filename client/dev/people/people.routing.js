"use strict";
var router_1 = require('@angular/router');
var people_1 = require('./components/people');
var Peopleform_1 = require('./components/Peopleform');
var Peopletoevent_1 = require('./components/Peopletoevent');
exports.peopleRouting = router_1.RouterModule.forChild([
    { path: 'peoplelists', component: people_1.People },
    { path: 'peopleForm/:id', component: Peopleform_1.Peopleform },
    { path: 'peopleForm/new', component: Peopleform_1.Peopleform },
    { path: 'peopletoevent', component: Peopletoevent_1.Peopletoevent }
]);
