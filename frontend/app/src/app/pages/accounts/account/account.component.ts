import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/authorization/auth.service';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    public user: User;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        // Get the user object upon initialization
        this.authService.getCurrentUserObs().subscribe(user => {
            this.user = user;
        });
    }

    /**
     * Uses the auth service to log out users. Navigate to the login page when finished
     */
    public logout(): void {
        this.authService.logout().subscribe(
            () => this.router.navigate(['/account/login']),
            () => this.router.navigate(['/account/login'])
        );
    }
}
