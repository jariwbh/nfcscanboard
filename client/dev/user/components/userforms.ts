import { Component, OnInit, Inject }             from '@angular/core';

import { FormBuilder, FormGroup, Validators }    from '@angular/forms';
import { Router, ActivatedRoute }                from '@angular/router';

import { BasicValidators }                       from '../../shared/components/basicValidators';

import { UserdetailsService }                    from '../services/userdetails.service';

import { UserModel }                             from '../models/user.model';


@Component({
  selector: 'userforms',
  templateUrl: 'user/templates/userforms.html',
  styleUrls: ['user/styles/userforms.css']
})
export class Userforms implements OnInit{

   form: FormGroup;
    title: string;
    user = new UserModel();

    events = [];
    public event_temp;
    public gender_temp;
    public selectedvalue;

    constructor(
            fb: FormBuilder,
            private _router: Router,
            private _route: ActivatedRoute,
            private _userService: UserdetailsService,
            private _userModel: UserModel
            ){
                this.form = fb.group({
                    username: ['', Validators.required],
                    email: ['', BasicValidators.email],
                });
            }

    ngOnInit(){
        
        var id = this._route.params.subscribe(params => {
            var id = +params["id"];
            this.title = id ? "Edit User" : "New User";
        
        if (!id)
			return;
            
            this._userService.getUser(id)
                .subscribe(
                    users => { 
                        this.user = users;
                    }
                );

        });
    }

    onSubmit(value: any){

        this._userModel.UserName=value.username;
        this._userModel.Email=value.email;
        this._userModel.UserKey=value.password;
        this._userModel.RoleID=1;
        this._userModel.Modified=654839;
        this._userModel.PIN=value.pin;

        var result;

        if(this.user.ID) {
            this._userModel.ID=this.user.ID;
           result = this._userService.UpdateUser(this._userModel);
		} else {
           result = this._userService.createUsers(this._userModel);
			
        }

        result.subscribe(
                  posts => {
                     this._router.navigate(['userlists']);
                  },
                  error => console.error(error),  
                  () => console.log("Finished")
		    );

     }

}
