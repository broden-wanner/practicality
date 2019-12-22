import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authorization/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // If the user is logged in, return true
    if (this.authService.isLoggedIn()) {
      return true;
    }
    // Navigate to login page
    this.router.navigate(['/account/login']);

    /** TODO: Save the state of the router and redirect there after login */
    return false;
  }
}
