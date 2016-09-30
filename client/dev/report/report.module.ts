
import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';

import { Report }              from './components/report';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        Report 
    ],
    exports: [
        Report 
    ]
})
export class ReportModule { 
}