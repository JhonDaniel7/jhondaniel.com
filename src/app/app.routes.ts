import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/modules/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contacts/contacts.module').then((m) => m.ContactsModule),
  },
  {
    path: 'lab',
    loadChildren: () => import('./pages/lab/lab.module').then((m) => m.LabModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
