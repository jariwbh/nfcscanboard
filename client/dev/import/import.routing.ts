import { RouterModule } from '@angular/router';

import { Import }       from './components/import';

export const importRouting = RouterModule.forChild([
    { path: 'import', component: Import }
]);


