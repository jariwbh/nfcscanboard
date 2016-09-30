import { Component, OnInit, Inject }             from '@angular/core';

import { FormBuilder, FormGroup, Validators }    from '@angular/forms';
import { Router, ActivatedRoute }                from '@angular/router';

import { BasicValidators }                       from '../../shared/components/basicValidators';
import { LoginService }                          from '../services/login.service';

import { LoginModel }                            from '../models/login.model';

@Component({
  selector: 'login',
  templateUrl: 'login/templates/login.html',
  styleUrls: ['login/styles/login.css']
})
export class Login {
  
    public checking_auth=false;
    public auth_error="";
    public error_auth = false;
    token: string;

    constructor(
            private _LoginService: LoginService,
            private _LoginModel: LoginModel,
            private _router:Router
    ){
        localStorage.removeItem('token');
        this.token = localStorage.getItem('token');
    }


    onSubmit(value: any){
        
         this.checking_auth=true;

         this._LoginModel.UserName= value.username;
         this._LoginModel.UserKey = value.password;

        

        console.log(value);
        console.log(value.username);
        console.log(value.password);

        this._LoginService.checkLogin(this._LoginModel)
            .subscribe(
                posts => {
                    console.log(posts); 
                    this.token = posts.Token;
                    localStorage.setItem('token', this.token);
                    this._router.navigate(['../home']);
                    
                },
                 response => {
                     if(response.status == 404){
                        this.error_auth = true;
                        this.auth_error= "Wrong Username or password .";
                        this.checking_auth=false; 
                     }
                 } 
            )
    }


}
