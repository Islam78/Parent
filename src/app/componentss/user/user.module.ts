import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { singleUserComponent } from './single-user/single-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';

const routes: Routes = [
  { path: 'list', component: UserListComponent, canActivate: [AuthGuard] },
  { path: "singel-user/:action/:id", component: singleUserComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    UserListComponent,
    singleUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    PaginatorModule,
    ConfirmPopupModule,
    RouterModule.forChild(routes)
  ],
  providers: [ConfirmationService]
})
export class UserModule { }
