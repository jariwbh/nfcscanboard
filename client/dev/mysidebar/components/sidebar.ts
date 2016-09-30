import {
  Component,
  Inject
} from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: 'mysidebar/templates/sidebar.html',
  styleUrls: ['mysidebar/styles/sidebar.css']
})
export class Sidebar {
  name: string = `yo, I'm your component :D`;

  isPath(path){
      if(path == window.location.pathname){
            return false;
        } else {
            return true;
        }
    }

    
}
