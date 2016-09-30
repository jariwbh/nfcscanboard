import { RouterModule } from '@angular/router';

import { People } from './components/people';
import { Peopleform } from './components/Peopleform';
import { Peopletoevent }  	from './components/Peopletoevent';

export const peopleRouting = RouterModule.forChild([
    { path: 'peoplelists', component:People },
    { path: 'peopleForm/:id', component: Peopleform },
	{ path: 'peopleForm/new', component: Peopleform },
    { path: 'peopletoevent', component: Peopletoevent }

]);