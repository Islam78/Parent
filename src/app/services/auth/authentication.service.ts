import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { IUser } from 'src/app/models/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /** authToken */
  private authToken: string | null = null;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  /**
   * login
   * @param userData 
   * @returns user || throwError
   */
  login(userData: any): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}login`, { ...userData })
      .pipe(
        map(user => {
          // store user details in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', JSON.stringify(user.token));

          this.setToken(user.token);
          return user;

        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  /** 
   * setToken token genrate 
   * @param token {string}
   * @returns void
   */
  setToken(token: string | null): void {
    this.authToken = token;
  }

  /**
   * getToken token genrate 
   * @returns token {string}
   */
  getToken(): string | null {
    const localStorageToken = JSON.stringify(localStorage.getItem('token'));

    if (localStorageToken) {
      // Fallback to localStorage if authToken is not set
      return JSON.stringify(localStorage.getItem('token'));
    } else {

      return this.authToken;
    }

  }

  /** 
   * isLoggedIn
   * @returns {boolean} 
   */
  isLoggedIn(): boolean {
    return !!this.authToken;
  }

  /**
  * logout
  * Logs the user out by clearing the token and user localstoage.
  * @returns void
  */
  logout(): void {
    // Clear the token
    this.setToken(null);
    // Clear the user details stored in local storage
    localStorage.clear();
    // navigating the user to the login page
    this.router.navigate(['/login']);
  }



}
