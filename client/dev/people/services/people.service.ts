import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers }   from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PeopleService{
    
    private _url="http://nfc-webui.azurewebsites.net/api/people/";
    static ENDPOINT: string = '/api/todos/:id';
    private _options;
    token_val: string;
    
    constructor(@Inject(Http) private _http: Http) {
        this.token_val =localStorage.getItem('token');
    }

    // constructor(private _http: Http){
    //      var headers = new Headers({
    //          'Content-Type': 'application/json',
    //          'Authorization': 'Basic IiI=.eyJVSUQiOiIyIiwiTmFtZSI6InNhbmppdiIsIlVUeXBlIjoiVVR5cGUiLCJFeHAiOiIxNDc2NTEzOTE4Ljk2OTM0IiwiUm9sZSI6IkFkbWluIn0=.5mofl6klOoCSS6YT9UOhWzyIHoRcTcHV85juztzgM0I='
    //      });
    //      this._options = new RequestOptions({ headers: headers , body: {} });
    // }

    getPeoples(){

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic '+this.token_val);    

      return  this._http
               .get(this._url+'PeopleList', {headers} )
               .map(res => res.json());
    }
    getPeople(id){

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic '+this.token_val);

      return  this._http.get(this._url+'peoplebyid/'+id, {headers})
               .map(res => res.json());
    }

    createPeoples(post){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic '+this.token_val);

     return this._http.post(this._url+'Add', JSON.stringify(post), {headers})
        .map(res => res.json());
    }
    updatePeoples(post){
         let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic '+this.token_val);

     return this._http.post(this._url+'Update', JSON.stringify(post), {headers})
        .map(res => res.json());
    }
    deletePeoples(id){
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic '+this.token_val);

        return  this._http.get(this._url+'delete/'+id, {headers})
               .map(res => res.json());
    }
    
    getPeopleDetails(id){
         let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic '+this.token_val);

       return  this._http.get(this._url+'delete/'+id, {headers})
               .map(res => res.json());
    }
}