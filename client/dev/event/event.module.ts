
import { NgModule }                    from '@angular/core';
import { CommonModule }                from '@angular/common';
import { FormsModule, 
         ReactiveFormsModule }         from '@angular/forms';
import { RouterModule }                from '@angular/router';
import { HttpModule }                  from '@angular/http';

import { SharedModule }                from '../shared/shared.module';

import { Eventlist }                    from './components/Eventlist';

import { Eventdetail }                  from './components/Eventdetail';
import { Eventschedule }               from  './components/Eventschedule';
import { Eventform }                   from  './components/Eventform';

import {EventService}                  from './services/event.service';

import {EventModel}                    from './models/events.model';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
        HttpModule
    ],
    declarations: [
        Eventlist,
        Eventdetail,
        Eventschedule,
        Eventform
    ],
    exports: [
        Eventlist,
        Eventdetail,
        Eventschedule,
        Eventform
    ],
    providers: [
        EventService,
        EventModel 
    ]
})
export class EventModule { 
}