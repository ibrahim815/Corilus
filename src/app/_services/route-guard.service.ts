import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private router: Router) { }
  public canActivate(route: ActivatedRouteSnapshot){
    let user = sessionStorage.getItem('user');
    if(user == 'admin'){
      return true;
    }

    console.log('Forbbiden');
    alert('Acces non autorisé');
    this.router.navigate(['home']);
    return false;
  }
}
