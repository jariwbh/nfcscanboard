import {
  Component,
  Inject
} from '@angular/core';

@Component({
  selector: 'peopletoevent',
  templateUrl: 'people/templates/peopletoevent.html',
  styleUrls: ['people/styles/peopletoevent.css']
})
export class Peopletoevent {
  name: string = `yo, I'm your component :D`;
}
