import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * getAllUsers
   * @param pageNumber {Number}
   * @returns user || throwError
   */
  getAllUsers(pageNumber: number): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}users?page=${pageNumber}`)
      .pipe(
        map(users => {
          return users;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  /**
  * getSingleUsers
  * @returns user || throwError
  */
  getSingleUsers(userId: string | ''): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}users/${userId}`)
      .pipe(
        map(singleUser => {

          return singleUser;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }


  /**
   * createUser
   * @param userData 
   * @returns user || throwError
   */
  createUser(userData: any): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}users`, { ...userData })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  /**
  * deleteSingleUsers
  * @returns user || throwError
  */
  deleteSingleUsers(itemId: number): Observable<any> {
    return this.http
      .delete<any>(`${environment.apiUrl}users/${itemId}`)
      .pipe(
        map(res => {
          return res;

        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
