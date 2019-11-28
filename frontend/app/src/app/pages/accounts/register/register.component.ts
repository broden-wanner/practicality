import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/authorization/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public toastController: ToastController
  ) {}

  public ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: '',
      first_name: '',
      last_name: '',
      username: '',
      password: ''
    });
  }

  /**
   * Attempts to register the user in with the given form data
   */
  public onSubmit(): void {
    const credentials = this.registerForm.value;
    this.authService.register(credentials).subscribe(
      () => this.router.navigate(['']),
      err => {
        console.log(err.error);
        this.presentToast('There are some errors in registrations. See above.');
      }
    );
  }

  /**
   * Presents the toast to the user
   */
  public async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: true,
      color: 'danger',
      duration: 4000
    });
    toast.present();
  }
}
