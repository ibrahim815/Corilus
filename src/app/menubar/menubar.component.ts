import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {
  currentUser: any;

  constructor(private token: TokenStorageService, private router : Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();

  }
  OnDeconnexion() {
    console.log("Deconnexion");
    this.token.signOut();
    this.router.navigateByUrl('/home');

  }

}
