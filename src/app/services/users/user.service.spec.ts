import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should call getAllUsers', () => {
    const pageNumber = 1;
    const mockResponse = {};

    userService.getAllUsers(pageNumber).subscribe((response) => {
      expect(response).toBeDefined();
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}users?page=${pageNumber}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getSingleUsers', () => {
    const userId = '1';
    const mockResponse = {};

    userService.getSingleUsers(userId).subscribe((response) => {
      expect(response).toBeDefined();
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call createUser', () => {
    const userData = {};
    const mockResponse = {};

    userService.createUser(userData).subscribe((response) => {
      expect(response).toBeDefined();
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}users`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call deleteSingleUsers', () => {
    const itemId = 1;
    const mockResponse = {};

    userService.deleteSingleUsers(itemId).subscribe((response) => {
      expect(response).toBeDefined();
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}users/${itemId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
