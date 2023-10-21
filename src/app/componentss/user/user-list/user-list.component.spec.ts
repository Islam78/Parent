import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { UserService } from 'src/app/services/users/user.service';
import { UserListComponent } from './user-list.component';
import { ConfirmationService } from 'primeng/api';
import Swal from 'sweetalert2';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  let confirmationService: ConfirmationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [UserService, ConfirmationService],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA], // Use NO_ERRORS_SCHEMA to suppress template errors

    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    confirmationService = TestBed.get(ConfirmationService);
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllUsers and set usersList and usersDetails', () => {
    const mockUserData = {
      data: [{}],
    };

    spyOn(userService, 'getAllUsers').and.returnValue(of(mockUserData));

    component.getAllUsers();

    expect(component.usersList).toBeDefined();
    expect(component.usersDetails).toBeDefined();
    expect(component.usersList).toEqual(mockUserData);
    expect(component.usersDetails).toEqual(mockUserData.data);
  });

  it('should display a success toast', () => {
    spyOn(Swal, 'fire').and.callThrough();
    component.toastSuccess('Successfully Deleted');

    expect(Swal.fire).toHaveBeenCalled();
  });

  it('should update the current page and call getAllUsers', () => {
    const event = { page: 2 };

    spyOn(component, 'getAllUsers').and.stub();

    component.onPageChange(event);

    expect(component.currentPage).toBeDefined();
    expect(component.getAllUsers).toHaveBeenCalled();
  });
});
