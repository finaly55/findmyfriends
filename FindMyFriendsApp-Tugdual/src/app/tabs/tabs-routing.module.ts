import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'friends',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../friends/friends.module').then(m => m.FriendsPageModule)
                    },
                    {
                        path: '/add-friends',
                        loadChildren: () =>
                            import('../friends/add-friends/add-friends.module').then(m => m.AddFriendsPageModule)
                    },
                    {
                        path: '/new-group',
                        loadChildren: () =>
                            import('../friends/add-friends/add-friends.module').then(m => m.AddFriendsPageModule)
                    }
                ]
            },
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../home/home.module').then(m => m.HomePageModule)
                    }
                ]
            },
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../profile/profile.module').then(m => m.ProfilePageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
