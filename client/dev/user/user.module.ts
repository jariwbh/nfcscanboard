
import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule, 
         ReactiveFormsModule } from '@angular/forms';
import { RouterModule }        from '@angular/router';
import { HttpModule }          from '@angular/http';

import { SharedModule }        from '../shared/shared.module';

import { Userlist }            from './components/Userlist';
import { Userforms }           from './components/Userforms';

import { UserdetailsService }  from './services/userdetails.service';

import { UserModel }           from './models/user.model';


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
        Userlist, 
        Userforms
    ],
    exports: [
        Userlist, 
        Userforms
    ],
    providers: [
        UserdetailsService,
        UserModel
    ]
})
export class UserModule { 
}