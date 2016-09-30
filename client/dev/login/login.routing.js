"use strict";
var router_1 = require('@angular/router');
var login_1 = require('./components/login');
exports.loginRouting = router_1.RouterModule.forChild([
    { path: 'login', component: login_1.Login },
]);
