"use strict";
var router_1 = require('@angular/router');
var Userlist_1 = require('./components/Userlist');
var Userforms_1 = require('./components/Userforms');
exports.userRouting = router_1.RouterModule.forChild([
    { path: 'userlists', component: Userlist_1.Userlist },
    { path: 'userForm/:id', component: Userforms_1.Userforms },
    { path: 'userForm/new', component: Userforms_1.Userforms }
]);
