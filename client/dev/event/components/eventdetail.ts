import {
  Component,
  Inject
} from '@angular/core';

@Component({
  selector: 'eventdetail',
  templateUrl: 'event/templates/eventdetail.html',
  styleUrls: ['event/styles/eventdetail.css']
})
export class Eventdetail {
  name: string = `yo, I'm your component :D`;
}
