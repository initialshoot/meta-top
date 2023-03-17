import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StartComponent } from './components/start/start.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Start',
    pathMatch: 'full'
  },
  { path: 'Login', component: LoginComponent },
  { path: 'SignIn', component: RegisterComponent },
  { path: 'Start', component: StartComponent },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
