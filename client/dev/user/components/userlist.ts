import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import { UserdetailsService } from '../services/userdetails.service';

@Component({
  selector: 'userlist',
  templateUrl: 'user/templates/userlist.html',
  styleUrls: ['user/styles/userlist.css']
})
export class Userlist implements OnInit {
  
    users = [];
    constructor(
            private _userService: UserdetailsService){}
    deleteFlag=false;
    pagedPosts = [];
    postsLoading;
    commentsLoading;
    currentPost;
    pageSize = 5;

   ngOnInit(){
       this.GetUserList();
    }    

    private GetUserList(){
         this._userService.getUsers()
            .subscribe(
                users => { 
                    this.users = users;
                   // this.pagedPosts = _.take(this.users, this.pageSize);
                },
                null,
                () => { this.postsLoading = false; }
            );
     }
    
    GetUserDetail(){   
        console.log('edit');
    }

    DeleteUser(id){
        this._userService.DeleteUser(id)
			.subscribe(
                  posts => {
                     this.GetUserList();
                  },
                  error => console.error(error),  
                  () => console.log("Finished")
		);
    }
}
