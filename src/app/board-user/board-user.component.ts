import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss']
})
export class BoardUserComponent implements OnInit {
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
