import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { User } from '../../shared/models/user';

declare var moment: any;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUser: BehaviorSubject<User>;

    constructor(private http: HttpClient) {
        this.currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('current_user')));
    }

    /**
     * Sends http request to server to log the user in
     *
     * @param credentials - Object with username and password fields
     * @returns An Observable for the login request
     */
    public login(credentials: { username: string; password: string }): Observable<any> {
        return this.http.post<any>('http://localhost:8000/api/auth/login', credentials).pipe(
            shareReplay(),
            tap(data => {
                this.setSession(data);
                this.currentUser.next(User.fromJson(data.user));
            })
        );
    }

    /**
     * Logs the user out by posting to the logout url
     *
     * @returns An Observable of the logout request
     */
    public logout(): Observable<any> {
        return this.http.post<any>('http://localhost:8000/api/auth/logout', {}).pipe(
            tap(() => {
                this.removeSession();
                this.currentUser.next(null);
            })
        );
    }

    /**
     * Sets the login session token in local storage
     * @param data - data to store in local storage
     */
    private setSession(data: any): void {
        localStorage.setItem('user_token', data.token);
        localStorage.setItem('current_user', JSON.stringify(data.user));
        localStorage.setItem('token_expiry_date', data.expiry_date);
    }

    /**
     * Removes the token from local storage
     */
    private removeSession(): void {
        localStorage.removeItem('user_token');
        localStorage.removeItem('current_user');
        localStorage.removeItem('token_expiry_date');
    }

    /**
     * Gets the authentication status based on whether the token is in local storage and before the expiration date
     *
     * @returns A boolean of whether the user is logged in
     */
    public isLoggedIn(): boolean {
        const expirationDate = localStorage.getItem('token_expiry_date');
        return moment().isBefore(expirationDate);
    }

    /**
     * Public getter to return the current logged in user as an observable
     *
     * @returns An Observable of the currently logged in user (will be null if no one is logged in)
     */
    public getCurrentUserObs(): Observable<User> {
        return this.currentUser.asObservable();
    }

    /**
     * Public getter to return the current logged in User
     *
     * @returns The user object itself (will be null if no one is logged in)
     */
    public getCurrentUser(): User {
        return this.currentUser.value;
    }

    /**
     * Public getter to find the user token
     *
     * @returns The user token in local storage as a string
     */
    public getUserToken(): string {
        return localStorage.getItem('user_token');
    }
}
