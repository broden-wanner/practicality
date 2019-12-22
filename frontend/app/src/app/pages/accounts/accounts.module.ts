import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'view',
    component: AccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [LoginComponent, AccountComponent, RegisterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountsModule {}
