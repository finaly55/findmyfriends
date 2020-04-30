import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'terms-of-use',
                loadChildren: () => import('../../pages/terms-of-use/terms-of-use.module').then(m => m.TermsOfUsePageModule)
            },
            {
                path: 'legal-notice',
                loadChildren: () => import('../../pages/legal-notice/legal-notice.module').then(m => m.LegalNoticePageModule)
            },
            {
                path: 'edit-password',
                loadChildren: () => import('../../pages/edit-password/edit-password.module').then(m => m.EditPasswordPageModule)
            },
            {
                path: 'groups',
                loadChildren: () => import('../../pages/groups/groups.module').then(m => m.GroupsPageModule)
            },
            {
                path: 'map',
                loadChildren: () => import('../../pages/map/map.module').then(m => m.MapPageModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('../../pages/profile/profile.module').then(m => m.ProfilePageModule)
            },
            {
                path: '',
                redirectTo: '/tabs/map',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/map',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
