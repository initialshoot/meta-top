import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HsHeroesComponent } from './components/hs-heroes/hs-heroes.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { StartComponent } from './components/start/start.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Start',
    pathMatch: 'full'
  },
  { path: 'Login', component: LoginComponent },
  { path: 'SignIn', component: RegisterComponent },
  { path: 'Start', component: StartComponent },
  { path: 'HS-Hero/:id', component: HsHeroesComponent },
  { path: 'Verify-Email', component: VerifyEmailComponent },
  { path: 'Reset-Password', component: ResetPassComponent },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: '**',
    redirectTo: 'Start',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
