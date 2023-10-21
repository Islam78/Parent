import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

describe('AuthenticationService', () => {
  let authService: AuthenticationService;
  let http: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    http = jasmine.createSpyObj('HttpClient', ['post']);

    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: HttpClient, useValue: http },
      ],
    });

    authService = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login successfully', () => {
    const userData: any = {
      "email": "eve.holt@reqres.in",
      "password": "cityslicka",
    };
    http.post.and.returnValue(of(userData));

    authService.login(userData).subscribe((user) => {
      expect(user).toEqual(userData);
    });
  });

 
  it('should set and get the token', () => {
    authService.setToken('islam test token');
    expect(authService.getToken()).toEqual('"undefined"');
  });

  it('should check if the user is logged in', () => {
    authService.setToken('islam test token');
    expect(authService.isLoggedIn()).toBe(true);

    authService.setToken(null);
    expect(authService.isLoggedIn()).toBe(false);
  });

});
