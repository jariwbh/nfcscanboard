import {
  Component,
  Inject
} from '@angular/core';

@Component({
  selector: 'notfound',
  templateUrl: 'notfound/templates/notfound.html',
  styleUrls: ['notfound/styles/notfound.css']
})
export class Notfound {
  name: string = `yo, I'm your component :D`;
}
