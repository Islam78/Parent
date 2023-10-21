import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  /** auth - login - and create new component */
  { path: '', loadChildren: () => import('./componentss/auth/auth.module').then(m => m.AuthModule) },
  /** user - user list - and edit - view */
  { path: 'user', loadChildren: () => import('./componentss/user/user.module').then(m => m.UserModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
