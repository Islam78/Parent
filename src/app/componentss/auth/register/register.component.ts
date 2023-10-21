import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/users/user.service';
import Swal from 'sweetalert2';
import { first } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {

  /** userForm */
  userForm!: FormGroup;

  /**
   * constructor
   * @param formBuilder {FormBuilder}
   * @param router {Router}
   * @param users {users}
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private users: UserService
  ) {
  }

  ngOnInit(): void {
    /** for the login form  */
    this.inituserForm();
  }

  /**
   * inituserForm
   * @returns void
   */
  inituserForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      job: ['', Validators.required]
    });
  }

  /**
   * onSubmit
   * @returns void
   */
  onSubmit(): void {
    // stop here if form is invalid
    if (this.userForm.invalid) {
      // mark form as invalid
      Object.values(this.userForm.controls).forEach(control => {
        control.markAsTouched();
      });
      // set error true
      this.userForm.setErrors({ 'required': true });
      return;
    }


    this.users.createUser(this.userForm.value)
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.router.navigate(['/user/list']);
          this.toastSuccess(`${data.name} - created successfully`);
        },
        error: error => {
          this.toasterror(error.error.error);

        }
      });
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
      timer: 7000,
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
