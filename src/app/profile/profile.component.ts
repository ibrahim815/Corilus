import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { TokenStorageService } from '../_services/token-storage.service';
import { UsersService } from '../_services/users.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
 
}