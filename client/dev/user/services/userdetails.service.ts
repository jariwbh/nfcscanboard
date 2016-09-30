import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers }   from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserdetailsService{

 private _url="http://nfc-webui.azurewebsites.net/api/user/";
 private _options;
 token_val: string;
 
 constructor(@Inject(Http) private _http: Http) {
        this.token_val =localStorage.getItem('token');
    }


    getUsers(){

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic '+this.token_val);

      return this._http.get(this._url+"UserList", {headers})
               .map(res => res.json());
    }
    
    getUser(id){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic '+this.token_val);
      
      return this._http.get(this._url+"userbyid/"+id,{headers})
               .map(res => res.json());
    }

    createUsers(Userpost){
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic '+this.token_val);
      
        return this._http.post(this._url+"AddUser", JSON.stringify(Userpost), {headers})
        .map(res => res.json());
    }

    UpdateUser(Userpost){
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic '+this.token_val);
      
        return this._http.post(this._url+"UpdateUser", JSON.stringify(Userpost), {headers})
        .map(res => res.json());
    }

    DeleteUser(DeleteUserID){
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic '+this.token_val);

        return this._http.get(this._url+"deleteuser/"+DeleteUserID, {headers})
        .map(res => res.json());
    }
}