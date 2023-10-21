import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Component, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent {

  /** loginForm */
  loginForm!: FormGroup;

  /**
   * constructor
   * @param formBuilder {FormBuilder}
   * @param router {Router}
   * @param authenticationService {AuthenticationService}
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    /** for the login form  */
    this.initLoginForm();
  }

  /**
   * initLoginForm
   * @returns void
   */
  initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      // proto type =>  eve.holt@reqres.in
      email: ['', Validators.required],
      // proto type =>  cityslicka
      password: ['', Validators.required]
    });
  }

  /**
   * onSubmit
   * @returns void
   */
  onSubmit(): void {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      // mark form as invalid
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      });
      // set error true
      this.loginForm.setErrors({ 'required': true });
      return;
    }

    // call end point
    this.authenticationService.login(this.loginForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/user/list']);
          this.toastSuccess('Successfully Logged In');
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
