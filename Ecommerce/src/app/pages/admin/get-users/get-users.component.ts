import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../../shared/service/spinner.service';
import { UserService } from '../../../shared/service/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
@Component({
  selector: 'app-get-users',
  standalone: true,
  imports: [CommonModule,FormsModule,NgxPaginationModule],
  templateUrl: './get-users.component.html',
  styleUrl: './get-users.component.css'
})
export class GetUsersComponent  implements  OnInit {

  public Users:any ;
  p:number = 1;

 public selectedUserId: any = null;

 constructor(private userService : UserService,private spinner :SpinnerService, private router : Router) { }

 ngOnInit(): void {
   this.getUsers();
 }

 getUsers(): void {
        this.spinner.show();
        this.userService.getUsers().subscribe(
         (res:any)=>{
           this.Users = res;
           this.spinner.hide();
           console.log(this.Users , 'products');
         });
 }

 confirmDelete(userId: string): void {
   this.selectedUserId = userId;
 }

 deleteUser(): void {
   this.spinner.show();
   this.userService.deleteUser(this.selectedUserId).subscribe(
    (res:any)=>{
       this.spinner.hide();
       this.selectedUserId = null;
       this.getUsers();
        console.log(res);
    })
 }

 cancelDelete(): void {
   this.selectedUserId = null;
 }



}
