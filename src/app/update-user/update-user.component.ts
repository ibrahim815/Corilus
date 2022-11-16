import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UsersService } from '../_services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  user : User = {
    username:'',
    email:'',
    password:'',
    roles:[],
  };
  mode = 'list';

  constructor(private usersService:UsersService, private router:Router,private toastService:ToastrService) { }

  ngOnInit(): void {
    this.getUserById(); 

  }
  onCancel()
  {
    this.mode='list';
    this.router.navigate(['admin/users']);


  }
  getUserById() {
    this.usersService.getUserById().subscribe(data => {
      this.user = data;
    });  }

    updateUser(id?:number){
    
      console.log(this.user);
      this.usersService.updateUser(this.user).subscribe();
      this.router.navigate(['admin/users']);
      this.toastService.success('Utilisateur modifié avec succès','Success');
}
}
