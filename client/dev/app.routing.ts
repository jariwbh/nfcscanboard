
import { RouterModule  }    from '@angular/router';

import { HomeComponent }         	from './home/components/home.component';
import { TodoCmp }   		from './todo/components/todo-cmp';
import { Notfound }         from './notfound/components/notfound';

export const routing = RouterModule.forRoot([
	 { path: '', component: HomeComponent },
	 { path: 'home', component: HomeComponent },
     { path: 'not-found', component: Notfound },
	 { path: '**', redirectTo: 'not-found' }
]);