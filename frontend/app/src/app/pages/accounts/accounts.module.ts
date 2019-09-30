import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'view',
        component: AccountComponent
    }
];

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
    declarations: [LoginComponent, AccountComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountsModule {}
