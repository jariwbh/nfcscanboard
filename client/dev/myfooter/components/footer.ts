import {
  Component,
  Inject
} from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: 'myfooter/templates/footer.html',
  styleUrls: ['myfooter/styles/footer.css']
})
export class Footer {
  name: string = `yo, I'm your component :D`;
   isPath(path){
      if(path == window.location.pathname){
            return false;
        } else {
            return true;
        }
    }

}
