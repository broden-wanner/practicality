import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './core/authorization/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Notes',
            url: '/notes',
            icon: 'musical-notes'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authService: AuthService
    ) {
        this.initializeApp();
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
     * Tells whether a user is logged in or not
     * @returns a boolean of the authorization status
     */
    public isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    /**
     * Uses the auth service to log out users
     */
    public logout(): void {
        this.authService.logout().subscribe();
    }
}
