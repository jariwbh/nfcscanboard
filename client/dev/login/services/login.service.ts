import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers }   from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService{
    
    private _url="http://nfc-webui.azurewebsites.net/api/User";
    public _options;

    constructor(@Inject(Http) private _http: Http) {
    }

    // constructor(private _http: Http){
    //     var headers = new Headers({
    //             'Content-Type': 'application/json', 
    //     });
    //     this._options = new RequestOptions({ headers: headers });
    // }


    getPosts(){
    
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic IiI=.eyJVSUQiOiIyIiwiTmFtZSI6InNhbmppdiIsIlVUeXBlIjoiVVR5cGUiLCJFeHAiOiIxNDc2NTEzOTE4Ljk2OTM0IiwiUm9sZSI6IkFkbWluIn0=.5mofl6klOoCSS6YT9UOhWzyIHoRcTcHV85juztzgM0I=');

     return this._http.get(this._url, {headers})
            .map(res => res.json());
    }

    checkLogin(post){
      console.log('Service Call');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
    
      return this._http.post(this._url+'/GetToken', JSON.stringify(post), {headers})
            .map(res => res.json());
    }
}