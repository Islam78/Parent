import { AuthenticationService } from '../services/auth/authentication.service';
import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    // retrieve the user's token from the AuthenticationService, or fall back it from local storage
    canActivate() {
        // token is available
        const token = this.authenticationService.getToken();
        
        // check if token is available
        if (token && token != "null") {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}