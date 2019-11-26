import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './core/authorization/auth.service';
import { User } from './shared/models/user';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    public appPages = [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: 'book'
        },
        {
            title: 'Notes',
            url: '/notes',
            icon: 'musical-notes'
        },
        {
            title: 'Projects',
            url: '/projects',
            icon: 'cafe'
        }
    ];

    public user: User;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authService: AuthService
    ) {
        this.initializeApp();
        this.getUser();
    }

    /**
     * Method provided by Ionic to initialize the app
     */
    public initializeApp(): void {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    /**
     * Gets the user for display by subscribing to auth service user observable
     */
    public getUser(): void {
        this.authService.getCurrentUserObs().subscribe(user => (this.user = user));
    }

    /**
     * Tells whether a user is logged in or not
     * @returns a boolean of the authorization status
     */
    public isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }
}
