import { RouterModule } from '@angular/router';
import { Login }        from './components/login';

export const loginRouting = RouterModule.forChild([
    { path: 'login', component:Login },
]);