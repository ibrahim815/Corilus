import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { UsersService } from '../_services/users.service';
@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  users!: User[];
  constructor(private usersService:UsersService,
    public auth:AuthService ) { }
  ngOnInit(): void {

    this.usersService.listeUser().subscribe(data => {
      console.log(data);
      this.users = data;
    });
 
}
}