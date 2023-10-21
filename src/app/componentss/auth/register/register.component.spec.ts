import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users/user.service';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    userService = jasmine.createSpyObj('UserService', ['createUser']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: Router, useValue: router },
      ],
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.ngOnInit();
    expect(component.userForm).toBeDefined();
  });

  xit('should handle form submission', () => {
    const formData = {
      "name": "morpheus",
      "job": "leader"
    };

    userService.createUser.and.returnValue(of(formData));
    component.userForm.setValue(formData);

    component.onSubmit();

    expect(userService.createUser).toHaveBeenCalledWith(formData);
    expect(router.navigate).toHaveBeenCalledWith(['/user/list']);
  });

  xit('should display error on invalid form submission', () => {
    component.userForm.markAsTouched();
    component.onSubmit();

    expect(component.userForm.errors).toEqual({ 'required': true });
  });

  xit('should handle user creation error', () => {
    const errorMessage = 'User creation failed';
    userService.createUser.and.returnValue(throwError({ error: { error: errorMessage } }));

    component.userForm.setValue({
      name: 'John Doe',
      job: 'Developer',
    });

    component.onSubmit();

    expect(userService.createUser).toHaveBeenCalled();
    expect(component.userForm.errors).toBeNull();
    expect(component.toasterror).toHaveBeenCalledWith(errorMessage);
  });

  it('should call toastSuccess', () => {
    component.toastSuccess('Success Message');
  });

  it('should call toasterror', () => {
    component.toasterror('Error Message');
  });
});
