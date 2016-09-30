import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import { EventService }      from '../services/event.service';

@Component({
  selector: 'eventlist',
  templateUrl: 'event/templates/eventlist.html',
  styleUrls: ['event/styles/eventlist.css']
})
export class Eventlist {
  events = [];
  pagedPosts = [];
  postsLoading;
  commentsLoading;
  currentPost;
  pageSize = 5;

  constructor(
            private _eventService: EventService){}
  
  ngOnInit() {
        this.loadEvent();
  }

  loadEvent(){
    this._eventService.getEvents()
        .subscribe(
            events => { 
                this.events = events;
               // this.pagedPosts = _.take(this.events, this.pageSize);
            }
        );
     }

}
