import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { IUserData, IUserDetails } from 'src/app/models/usersData';
import { UserService } from 'src/app/services/users/user.service';
import { ConfirmationService } from 'primeng/api';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {

  /** usersList */
  usersList!: IUserData | any;
  /** usersDetails */
  usersDetails!: IUserDetails[];
  /** currentPage */
  currentPage: number = 1;
  /** itemsPerPage */
  itemsPerPage: number = 6;

  constructor(
    private userService: UserService,
    public confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    /** getAllUsers */
    this.getAllUsers();
  }


  /**
   * getAllUsers
   * @returns void
   */
  getAllUsers(): void {
    this.userService.getAllUsers(this.currentPage).subscribe(
      (data) => {
        // set user list to genrate all data and user details
        this.usersList = data;
        this.usersDetails = data.data;
      },
      (error) => {
        // Handle errors 
        return error
      }
    );
  }

  /**
   * confirmDelete
   * @param event 
   * @param product
   * @returns void
   */
  confirmDelete(event: any, product: any): void {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure you want to delete this?',
      icon: 'pi pi-trash',
      accept: () => {
        // Delete action
        this.deleteItem(product);
      }
    });
  }

  /**
   * deleteItem
   * @param itemId 
   * @returns void
   */
  deleteItem(itemId: number): void {
    this.userService.deleteSingleUsers(itemId).subscribe(
      (data) => {
        this.toastSuccess('Successfully Deleted');
        this.getAllUsers();
      },
      (error) => {
        // Handle errors here
        return error;
      }
    );
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
   * onPageChange
   * @param event 
   * @returns void
   */
  onPageChange(event: any): void {
    this.currentPage = event.page + 1;
    this.getAllUsers();

  }

}
