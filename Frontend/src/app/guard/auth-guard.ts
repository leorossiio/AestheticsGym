import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
class AuthGuard {

  constructor(
    private authService : AuthService,
    private router: Router
  ) { }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {   
    if (this.authService.usuarioEstaAutenticado()){
      return true;

    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}

export const IsAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean => {
  return inject(AuthGuard).canActivate(route,state);
}
