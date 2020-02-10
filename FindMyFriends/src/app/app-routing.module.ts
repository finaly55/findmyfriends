import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./communs/tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'forgotten-password', loadChildren: './pages/forgotten-password/forgotten-password.module#ForgottenPasswordPageModule' },  { path: 'terms-of-use', loadChildren: './pages/terms-of-use/terms-of-use.module#TermsOfUsePageModule' },
  { path: 'legal-notice', loadChildren: './pages/legal-notice/legal-notice.module#LegalNoticePageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
