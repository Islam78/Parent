import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let formBuilder: FormBuilder;
  let authenticationService: AuthenticationService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [FormBuilder, AuthenticationService, Router],
      imports: [HttpClientTestingModule], 

    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    authenticationService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
  }));

  xit('should create the component', () => {
    expect(component).toBeTruthy();
  });

  xit('should initialize the login form', () => {
    component.initLoginForm();

    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')).toBeDefined();
    expect(component.loginForm.get('password')).toBeDefined();
  });

  xit('should handle form submission when form is valid', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const loginFormValue = {
      "email": "eve.holt@reqres.in",
      "password": "cityslicka"
    };
    component.loginForm = formBuilder.group(loginFormValue);

    const successResponse = {};
    spyOn(authenticationService, 'login').and.returnValue(of(successResponse));

    const toastSuccessSpy = spyOn(component, 'toastSuccess');

    component.onSubmit();

    expect(authenticationService.login).toHaveBeenCalledWith(loginFormValue);
    expect(navigateSpy).toHaveBeenCalledWith(['/user/list']);
    expect(toastSuccessSpy).toHaveBeenCalledWith('Successfully Logged In');
  });

  xit('should handle form submission when authenticationService returns an error', () => {
    component.loginForm = formBuilder.group({
      "email": "eve.holt@reqres.in",
      "password": "cityslicka"
    });

    const errorResponse = { error: 'Authentication failed' };
    spyOn(authenticationService, 'login').and.returnValue(throwError(errorResponse));

    const toastErrorSpy = spyOn(component, 'toasterror');

    component.onSubmit();

    expect(toastErrorSpy).toHaveBeenCalledWith('Authentication failed');
  });

  it('should display a success toast', () => {
    spyOn(Swal, 'fire').and.callThrough();

    component.toastSuccess('Successfully Logged In');

    expect(Swal.fire).toHaveBeenCalled();
  });

  it('should display an error toast', () => {
    spyOn(Swal, 'fire').and.callThrough();

    component.toasterror('Error Message');

    expect(Swal.fire).toHaveBeenCalled();
  });
});
