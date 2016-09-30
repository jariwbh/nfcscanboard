import { NgModule }                    from '@angular/core';
import { CommonModule }                from '@angular/common';
import { FormsModule, 
         ReactiveFormsModule }         from '@angular/forms';
import { RouterModule }                from '@angular/router';
import { HttpModule }                  from '@angular/http';

import { SharedModule }                from '../shared/shared.module';

import { People }                      from './components/people';
import { Peopleform }                  from './components/Peopleform';
import { Peopletoevent }               from './components/Peopletoevent';


import {PeopleService}                 from './services/people.service';
import {EventService}                  from '../event/services/event.service';

import {PeopleModel}                   from './models/people.model';

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
        HttpModule
    ],
    declarations:[
        People,
        Peopleform,
        Peopletoevent
    ],
    exports:[
        People,
        Peopleform,
        Peopletoevent
    ],
    providers:[
        PeopleService,
        EventService,
        PeopleModel
    ]
    
})

export class PeopleModule{}