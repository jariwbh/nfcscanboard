import {
  Component,
  Inject
} from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: 'home/templates/home.component.html',
  styleUrls: ['home/styles/home.component.css']
})
export class HomeComponent {
  name: string = `yo, I'm your Home component :D`;
}
