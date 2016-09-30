import {
  Component,
  Inject
} from '@angular/core';

@Component({
  selector: 'report',
  templateUrl: 'report/templates/report.html',
  styleUrls: ['report/styles/report.css']
})
export class Report {
  name: string = `yo, I'm your component :D`;
}
