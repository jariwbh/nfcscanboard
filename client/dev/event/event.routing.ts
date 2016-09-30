import { RouterModule  }            from  '@angular/router';

import { Eventlist }                from  './components/Eventlist';

import { Eventdetail }              from './components/Eventdetail';
import { Eventschedule }            from  './components/Eventschedule';
import { Eventform }                from  './components/Eventform';



export const eventRouting = RouterModule.forChild([
    { path: 'eventlists', component: Eventlist },
     { path: 'eventdetails', component: Eventdetail },
     { path: 'eventschedule', component: Eventschedule },
     { path: 'eventForm/:id', component: Eventform },
	 { path: 'eventForm/new', component: Eventform }
]);