import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
        canActivate: [AuthGuardService]
    },
    {path: '', redirectTo: 'signin', pathMatch: 'full'},
    {path: 'signin', loadChildren: './auth/signin/signin.module#SigninPageModule'},
    {path: 'signup', loadChildren: './auth/signup/signup.module#SignupPageModule'},
    {path: 'group-details', loadChildren: './friends/group-details/group-details.module#GroupDetailsPageModule'},
    {path: 'add-friends', loadChildren: './friends/add-friends/add-friends.module#AddFriendsPageModule'},
    {path: 'legal', loadChildren: './legal/legal.module#LegalPageModule'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
