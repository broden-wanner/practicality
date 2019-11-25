import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/authorization/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    public user: User;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        // Get the user object upon initialization
        this.authService.getCurrentUserObs().subscribe(user => {
            this.user = user;
        });
    }
}
