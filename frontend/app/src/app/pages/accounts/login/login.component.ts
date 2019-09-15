import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/authorization/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        public toastController: ToastController
    ) {}

    public ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: '',
            password: ''
        });
    }

    /**
     * Attempts to log the user in with the given form data
     */
    public onSubmit(): void {
        const credentials = this.loginForm.value;
        this.authService
            .login(credentials)
            .subscribe(success => this.router.navigate(['']), error => this.presentToast());
    }

    /**
     * Presents the toast to the user
     */
    public async presentToast() {
        const toast = await this.toastController.create({
            message: 'Incorrect credentials',
            duration: 2000
        });
        toast.present();
    }
}
