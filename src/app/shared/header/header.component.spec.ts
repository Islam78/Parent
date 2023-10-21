import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthenticationService', ['logout']);

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthenticationService, useValue: authService },
      ],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout method when logout is triggered', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
