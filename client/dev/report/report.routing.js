"use strict";
var router_1 = require('@angular/router');
var report_1 = require('./components/report');
exports.reportRouting = router_1.RouterModule.forChild([
    { path: 'reports', component: report_1.Report }
]);
