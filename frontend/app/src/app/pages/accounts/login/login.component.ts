import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/authorization/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';

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
    private toastService: ToastService
  ) {}

  public ngOnInit(): void {
    // Initialize the login form at the start
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Attempts to log the user in with the given form data
   */
  public onSubmit(): void {
    if (this.loginForm.status === 'INVALID') {
      this.toastService.sendMessage('Incorrect credentials', 'danger');
      return;
    }
    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe(
      succcess => {
        this.toastService.sendMessage('Login successful', 'success', 2000);
        this.router.navigate(['']);
      },
      error => this.toastService.sendMessage('Incorrect credentials', 'danger')
    );
  }
}
