import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'dashboard',
    component: TabsPage,
    children: [
      {
        path: 'conditions-generales',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../pages/conditions-generales/conditions-generales.module').then(m => m.ConditionsGeneralesPageModule)
          }
        ]
      },
      {
        path: 'mentions-legales',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../pages/mentions-legales/mentions-legales.module').then(m => m.MentionsLegalesPageModule)
          }
        ]
      },
      {
        path: 'edit-password',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../pages/edit-password/edit-password.module').then(m => m.EditPasswordPageModule)
          }
        ]
      },
      {
        path: 'groupes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../pages/groupes/groupes.module').then(m => m.GroupesPageModule)
          }
        ]
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../pages/map/map.module').then(m => m.MapPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../pages/profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/dashboard/groupes',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard/groupes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
