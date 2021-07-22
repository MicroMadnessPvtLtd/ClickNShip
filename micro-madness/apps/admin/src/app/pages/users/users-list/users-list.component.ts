import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import { UsersService, User } from '@micro-madness/users';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  constructor(
    private usersService: UsersService,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getUsers();
  }

  updateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`);
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete the User??',
        header: 'Delete Category',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this._deleteUser(userId);
        },
        reject: () => {}
    });
  }

  private _getUsers() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    })
  }

  private _deleteUser(userId: string) {
    this.usersService.deleteUser(userId).subscribe(() => {
      this.messageService.add(
        {
          severity:'success', 
          summary:'Success', 
          detail:'User Deleted Successfully'
        }
      );
      this._getUsers();
    }, () => {
      this.messageService.add(
        {
          severity:'error', 
          summary:'Error', 
          detail:'Something happened wrong. Please try again. If the issue remains, please contact support.'
        }
      );
    });
  }

}
