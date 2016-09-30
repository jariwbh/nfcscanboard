import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import {PeopleService} from '../services/people.service';
//import * as _ from 'underscore';

@Component({
  selector: 'people',
  templateUrl: 'people/templates/people.html',
  styleUrls: ['people/styles/people.css']
})
export class People {

  peoples = [];
  pagedPosts = [];
  postsLoading;
  commentsLoading;
  currentPost;
  pageSize = 5;

  constructor(
        private _peopleService: PeopleService
    ){}

    ngOnInit() {
        console.log('here');
        this.loadPeople();
    }
  
    private loadPeople(){
      this._peopleService.getPeoples()
        .subscribe(
          peoples => { 
              this.peoples = peoples;
              //console.log(peoples);
              //this.pagedPosts = _.take(this.peoples, this.pageSize);
         },
         null,
         () => { this.postsLoading = false; }
      );
    }

    delete(id){
        this._peopleService.deletePeoples(id)
			    .subscribe(
             posts => {
               this.loadPeople();
            },
            error => console.error(error),  
            () => console.log("Finished")
		    );
    }

    // onPageChanged(page) {
    //     var startIndex = (page - 1) * this.pageSize;
    //     this.pagedPosts = _.take(_.rest(this.peoples, startIndex), this.pageSize);
	  // }

}
