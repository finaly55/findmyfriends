import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from './core/guards/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./shared/tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuardService]},
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'forgotten-password', loadChildren: './pages/forgotten-password/forgotten-password.module#ForgottenPasswordPageModule' },  { path: 'groups', loadChildren: './pages/groups/groups.module#GroupsPageModule' },
  { path: 'group-modal', loadChildren: './shared/group-modal/group-modal.module#GroupModalPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
