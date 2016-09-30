import {
  Component,
  Inject
} from '@angular/core';

@Component({
  selector: 'calendar',
  templateUrl: 'calendar/templates/calendar.html',
  styleUrls: ['calendar/styles/calendar.css']
})
export class Calendar {
  name: string = `yo, I'm your component :D`;
}
