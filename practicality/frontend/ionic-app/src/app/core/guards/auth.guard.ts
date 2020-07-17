import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authorization/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // If the user is logged in, return true
    if (this.authService.isLoggedIn()) {
      return true;
    }
    // Display a message saying they must be logged in
    this.toastService.sendMessage('You must be logged in to go here', 'danger', 2000);
    // Navigate to login page
    this.router.navigate(['/account/login']);

    // TODO: Save the state of the router and redirect there after login
    return false;
  }
}
