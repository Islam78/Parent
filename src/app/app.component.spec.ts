import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationService } from './services/auth/authentication.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthenticationService', ['getToken']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: AuthenticationService, useValue: authService },
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  xit('should create the component', () => {
    expect(component).toBeTruthy();
  });

  xit('should return true when the user is logged in', () => {
    authService.setToken('islam')
    authService.getToken.and.returnValue('');
    const result = component.isUserLoggedIn();
    expect(result).toBe(true);
  });

  xit('should return false when the user is not logged in', () => {
    authService.setToken('islam')
    authService.getToken.and.returnValue('islam');
    const result = component.isUserLoggedIn();
    expect(result).toBe(false);
  });

  xit('should return false when the token is "null"', () => {
    authService.getToken.and.returnValue('null');
    const result = component.isUserLoggedIn();
    expect(result).toBe(false);
  });
});
