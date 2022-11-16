import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TechGuardGuard implements CanActivate {
  private roles: string[] = [];
  isLoggedIn = false;
  constructor(private tokenStorageService: TokenStorageService,private router: Router) { }
  public canActivate(route: ActivatedRouteSnapshot){
    
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      let user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      if(user.roles.includes('ROLE_MODERATOR')){
        return true;

      }
    }
    console.log('Forbbiden');
    alert('Acces non autorisé');
    this.router.navigate(['home']);
    return false;
  }
  
}