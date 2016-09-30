import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers }   from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService{
    
    private _url="http://nfc-webui.azurewebsites.net/api/event/";
    token_val: string;

     constructor(@Inject(Http) private _http: Http) {
        this.token_val =localStorage.getItem('token');
    }

    getEvents(){
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic '+this.token_val);

        return  this._http.get(this._url+"geteventlist", {headers})
               .map(res => res.json());
    }

    createEvent(post){
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic '+this.token_val);

        return this._http.post(this._url, JSON.stringify(post),{headers})
        .map(res => res.json());
    }
    
     getRecurringList() {
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic '+this.token_val);

        return this._http.get(this._url + "RecurringList", {headers})
            .map(res => res.json());
    }
    checkUniqueness(name) {
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic '+this.token_val);
      
       return this._http.get(this._url + 'eventbyname/' + name, {headers})
            .map(res => res.json());
    }

}