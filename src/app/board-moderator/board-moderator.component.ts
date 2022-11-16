import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.scss']
})
export class BoardModeratorComponent implements OnInit {

  currentUser: any;

  constructor(private token: TokenStorageService, private router : Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();

  }
  logout(){
    console.log("Deconnexion");
    this.token.signOut();
    this.router.navigateByUrl('/home');
  }

}
