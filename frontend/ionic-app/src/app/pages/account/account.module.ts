import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { AccountViewComponent } from './view/account.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IonicModule, AccountPageRoutingModule],
  declarations: [LoginComponent, AccountViewComponent, RegisterComponent],
})
export class AccountPageModule {}
