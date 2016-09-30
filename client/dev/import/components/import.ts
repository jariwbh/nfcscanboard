import {
  Component,
  Inject
} from '@angular/core';

@Component({
  selector: 'import',
  templateUrl: 'import/templates/import.html',
  styleUrls: ['import/styles/import.css']
})
export class Import {
  name: string = `yo, I'm your component :D`;
}
