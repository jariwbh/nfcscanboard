
import { RouterModule  }     from '@angular/router';

import { Report }    from './components/report';

export const reportRouting = RouterModule.forChild([
    { path: 'reports', component: Report }
]);