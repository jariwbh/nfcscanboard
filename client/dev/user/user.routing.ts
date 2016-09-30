
import { RouterModule  }     from '@angular/router';

import { Userlist }  from './components/Userlist';

import { Userforms }    from './components/Userforms';


export const userRouting = RouterModule.forChild([
    { path: 'userlists', component: Userlist },
    { path: 'userForm/:id', component: Userforms },
	{ path: 'userForm/new', component: Userforms }
    
]);