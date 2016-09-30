import {
  Component,
  Inject
} from '@angular/core';

@Component({
  selector: 'eventschedule',
  templateUrl: 'event/templates/eventschedule.html',
  styleUrls: ['event/styles/eventschedule.css']
})
export class Eventschedule {
  name: string = `yo, I'm your component :D`;
}
