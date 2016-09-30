
import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';

import { PaginationComponent } from './components/pagination.component';
import { SpinnerComponent }    from './components/spinner.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PaginationComponent, 
        SpinnerComponent
    ],
    exports: [
        PaginationComponent, 
        SpinnerComponent
    ]
})
export class SharedModule { 
}