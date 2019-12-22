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
    this.router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
