import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'dashboard',
    component: TabsPage,
    children: [
      {
        path: 'terms-of-use',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../pages/terms-of-use/terms-of-use.module').then(m => m.TermsOfUsePageModule)
          }
        ]
      },
      {
        path: 'legal-notice',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../pages/legal-notice/legal-notice.module').then(m => m.LegalNoticePageModule)
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
