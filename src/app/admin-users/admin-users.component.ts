import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  employees: any;

  searchText: any;

  currentIndex = -1;
  pageOfItems!: Array<any>;
  mode = 'list';
  users!: User[];
  p: number = 1;
  total: number = 0;
  form: any = {
    username: null,
    email: null,
    password: null,
    service: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  user : User = {
    username:'',
    email:'',
    password:'',
  };
  editUser: any;


  constructor(private usersService : UsersService, private router:Router, private toastService:ToastrService) {

  }

  ngOnInit():void {
    this.getAllUsers();

  }
  
  getAllUsers():void {
 
    this.usersService.listeUser().pipe().subscribe(data => {
      console.log(data);
      this.users = data;
    });
  }
  pageChangeEvent(event: number){
    this.p = event;
    this.getAllUsers();
}
onEdit(id?: number)
  {
    console.log("id = ", id);
    this.usersService.getId(id);
    this.mode = 'edit-User';
  }

  onCancel()
  {
    this.mode='list';

  }
  onSubmit(): void {
    const { username, email, password, roles } = this.form;
    this.usersService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.toastService.success('Utilisateur créé avec succès', 'Nouveau Utilisateur');
        this.router.navigate(['admin/users']);
        window.location.reload();


      },
      error: err => {
        this.errorMessage = err.error.message;
        this.toastService.error(err.error.message);

        this.isSignUpFailed = true;
      }
    });
  }
  onNewEmployee(){
   
    if (this.mode != 'new-employee') {
      this.mode = 'new-employee';
    } else {
      this.mode = 'list';
    }
  }

  OnDeleteUser(id? : number) 
  {
    if (confirm("Are you sure you want to delete this ?")) {
   this.usersService.deleteUser(id).subscribe();
   this.router.navigate(['employees']);
   this.toastService.info('Utilisateur supprimé avec succès', ' Utilisateur supprimé');
   window.location.reload();


  }}
  updateUser(id? : number){
    console.log("id = ", id);
    this.usersService.getId(id);
    this.router.navigate(['admin/update-user']);
  }

  
}


