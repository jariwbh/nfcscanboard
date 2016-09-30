import {
  Component,
  Inject
} from '@angular/core';

@Component({
  selector: 'myheader',
  templateUrl: 'myheader/templates/myheader.html',
  styleUrls: ['myheader/styles/myheader.css']
})
export class Myheader {
  name: string = `My Header`;

  isPath(path){
      if(path == window.location.pathname){
            return false;
        } else {
            return true;
        }
    }
    
}
