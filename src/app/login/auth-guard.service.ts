import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Verifica si hay un token en el almacenamiento local
    const token = localStorage.getItem('token');
    console.log(token);
    if (this.authService.isAuthenticated()) {
      // Usuario autenticado
      return true;
    } else {
      // Usuario no autenticado, redirige al componente de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}