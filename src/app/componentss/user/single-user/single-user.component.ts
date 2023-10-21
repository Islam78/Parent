import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/services/users/user.service';
import Swal from 'sweetalert2';
import { first } from 'rxjs';

@Component({
  selector: 'app-singleUser',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class singleUserComponent {

  /** singleUserForm */
  singleUserForm!: FormGroup;
  /** userId */
  userId!: string;
  /** userParam */
  userParam!: string;

  /**
   * constructor
   * @param formBuilder {FormBuilder}
   * @param router {Router}
   * @param userService {userService}
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public _ActivatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    /** for the singleUser form  */
    this.initsingleUserForm();
    /** userId */
    this.userId = this._ActivatedRoute.snapshot.paramMap.get('id') ?? '';
    /** userParam */
    this.userParam = this._ActivatedRoute.snapshot.paramMap.get('action') ?? '';
    /** getSingleUsers */
    this.getSingleUsers();
  }

  /**
   * getSingleUsers
   * @returns void
   */
  getSingleUsers(): void {
    this.userService.getSingleUsers(this.userId).subscribe(
      (data) => {
        // patch value from end point to form to update
        this.singleUserForm.patchValue(data.data);
      },
      (error) => {
        // Handle errors here
        return error
      }
    );
  }

  /**
   * initsingleUserForm
   * @returns void
   */
  initsingleUserForm(): void {
    this.singleUserForm = this.formBuilder.group({
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      avatar: ['', Validators.required]
    });
  }

  /**
   * onSubmit
   * @returns void
   */
  onSubmit(): void {
    // stop here if form is invalid
    if (this.singleUserForm.invalid) {
      // mark form as invalid
      Object.values(this.singleUserForm.controls).forEach(control => {
        control.markAsTouched();
      });
      // set error true
      this.singleUserForm.setErrors({ 'required': true });
      return;
    }

    // call end point
    // i didint found end point for update user;
    
    this.toastSuccess('dummy success update');
    this.router.navigate(['/user/list']);
  }

  /**
   * toastSuccess 
   * @param msg  {String}
   * @param timerProgressBar {String} 
   * @returns void
   */
  toastSuccess(msg: string, timerProgressBar: boolean = false): void {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: 'success',
      timerProgressBar,
      timer: 5000,
      title: msg
    })
  }

  /**
   * toasterror 
   * @param msg  {String}
   * @param timerProgressBar {String} 
   * @returns void
   */
  toasterror(msg: string, timerProgressBar: boolean = false): void {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: 'error',
      timerProgressBar,
      timer: 5000,
      title: msg
    })
  }

}
