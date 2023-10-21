import { ComponentFixture, TestBed } from '@angular/core/testing';
import { singleUserComponent } from './single-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('singleUserComponent', () => {
  let component: singleUserComponent;
  let fixture: ComponentFixture<singleUserComponent>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthenticationService', ['login']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [singleUserComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],

      providers: [
        { provide: AuthenticationService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: ActivatedRoute },

      ],
    });

    fixture = TestBed.createComponent(singleUserComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  xit('should initialize the form', () => {
    component.ngOnInit();
    expect(component.singleUserForm).toBeDefined();
  });

  xit('should handle form submission', () => {
    const formData = {
      "email": "eve.holt@reqres.in",
      "password": "cityslicka"
    };

    authService.login.and.returnValue(of({}));
    component.singleUserForm.setValue(formData);

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith(formData);
    expect(router.navigate).toHaveBeenCalledWith(['/user-list']);
  });

  xit('should display error on invalid form submission', () => {
    component.singleUserForm.markAsTouched();
    component.onSubmit();

    expect(component.singleUserForm.errors).toEqual({ 'required': true });
  });

  xit('should handle login error', () => {
    const errorMessage = 'Login failed';
    authService.login.and.returnValue(throwError({ error: { error: errorMessage } }));

    component.singleUserForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(authService.login).toHaveBeenCalled();
    expect(component.singleUserForm.errors).toBeNull();
    expect(component.toasterror).toHaveBeenCalledWith(errorMessage);
  });

  it('should call toastSuccess', () => {
    component.toastSuccess('Success Message');
  });

  it('should call toasterror', () => {
    component.toasterror('Error Message');
  });
});
