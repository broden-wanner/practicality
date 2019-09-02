import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../authorization/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    /**
     * Method required by the HttpInterceptor interface that adds the token to the headers for each request
     * if the user is logged in
     *
     * @param request - The incomeing http request
     * @param next - What the app will do next with the request
     * @returns An Observable of the http event
     */
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isLoggedIn()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Token ${this.authService.getUserToken()}`
                }
            });
        }
        return next.handle(request);
    }
}
