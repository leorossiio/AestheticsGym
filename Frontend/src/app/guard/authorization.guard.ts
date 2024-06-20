import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
class AuthorizationGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivateProfessor(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const userRole = this.authService.getUserRole();
    if (userRole === "PROFESSOR") {
      return true;
    } else {
      this.router.navigate(['/forbidden']);
      return false;
    }
  }
}

export const IsAuthorizationGuardProfessor: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean => {
  return inject(AuthorizationGuard).canActivateProfessor(route, state);
}