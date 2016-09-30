import { NgModule }                    from '@angular/core';
import { CommonModule }                from '@angular/common';
import { FormsModule, 
         ReactiveFormsModule }         from '@angular/forms';
import { RouterModule }                from '@angular/router';
import { HttpModule }                  from '@angular/http';

import { Login }                      from './components/login';
import {LoginService}                 from './services/login.service';

import { LoginModel }                 from './models/login.model';

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule
    ],
    declarations:[
        Login
    ],
    exports:[
        Login
    ],
    providers:[
        LoginService,
        LoginModel
    ]
    
})
export class LoginModule{}