import { Component, OnInit, Inject }             from '@angular/core';

import { FormBuilder, FormGroup, Validators }    from '@angular/forms';
import { Router, ActivatedRoute }                from '@angular/router';

import { BasicValidators }                       from '../../shared/components/basicValidators';
import { PeopleService }                         from '../services/people.service';
import { EventService }                          from '../../event/services/event.service';

import { PeopleModel }                                from '../models/people.model';

@Component({
  selector: 'peopleform',
  templateUrl: 'people/templates/peopleform.html',
  styleUrls: ['people/styles/peopleform.css']
})

export class Peopleform implements OnInit {
    
    form: FormGroup;
    title: string;
    people = new PeopleModel();

    events = [];
    public event_temp;
    public gender_temp;
    public selectedvalue;

     constructor(
            fb: FormBuilder,
            private _router: Router,
            private _route: ActivatedRoute,
            private _peopleService: PeopleService,
            private _eventService: EventService,
            private _PeopleModel: PeopleModel
            ){
            
                this.form = fb.group({
                    name: ['', Validators.required],
                    email: ['', BasicValidators.email],
                    phone: []
                });

                this._eventService.getEvents()
                .subscribe(
                    events => { 
                        this.events = events;
                    }
                );
            }

    ngOnInit(){
        var id = this._route.params.subscribe(params => {
            var id = +params["id"];
            this.title = id ? "Edit People" : "New People";
            if (!id)
			    return;
    
            this._peopleService.getPeople(id)
            .subscribe(
                peoples => { 
                    this.people = peoples;
                    this.selectedvalue=this.people['EventId'];
                    //console.log(this.selectedvalue);
                }
            );
        });
    }

  onEventchange(Value) {
    this.event_temp = Value;
  }

  onGenderchange(Value) {
    this.gender_temp = Value;
  }

  onSubmit(value: any){

        this._PeopleModel.Name=value.name;
        this._PeopleModel.Email=value.email;
        this._PeopleModel.Phone=value.phone;
        this._PeopleModel.Gender="MALE";
        this._PeopleModel.ContactPreferenceID='1';
        this._PeopleModel.EventId=this.event_temp;
        this._PeopleModel.Modified='1';

        console.log(this.event_temp);

        var result;

        if(this.people.ID) {
            this._PeopleModel.ID=this.people.ID;
            if(!this.event_temp){
                this._PeopleModel.EventId=this.people.EventId;
            }
           result = this._peopleService.updatePeoples(this._PeopleModel);
		} else {
           result = this._peopleService.createPeoples(this._PeopleModel);
			
        }

        result.subscribe(
                  posts => {
                     this._router.navigate(['peoplelists']);
                  },
                  error => console.error(error),  
                  () => console.log("Finished")
		    );

     }

}