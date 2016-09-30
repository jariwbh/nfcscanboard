import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Import } from './components/import';

@NgModule({
    imports:[
        CommonModule
    ],
    declarations:[
        Import
    ],
    exports:[
        Import
    ]
})

export class ImportModule{
    
}