
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface UserInfo {
  id: number;
  nombre: string;
  tipoUsuario: number;
  // Otros campos del usuario...
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8085/api';  // Coloca la URL de tu servidor

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post<{ token: string, userInfo: UserInfo }>(`${this.baseUrl}/login`, loginData).pipe(
      tap((response: any) => {  // Especifica el tipo de 'response'
        // Almacena el token en el almacenamiento local
        localStorage.setItem('token', response.token);

        // Asegúrate de que la información del usuario esté disponible
        console.log('Información del usuario:', response.userInfo);

        // Almacena la información del usuario en el almacenamiento local
        localStorage.setItem('userInfo', JSON.stringify(response.userInfo));
      })
    );
  }

  logout(): void {
    // Borra el token y la información del usuario del almacenamiento local al cerrar sesión
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    console.log("borrado desde authservice");
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    // Verifica si hay un token en el almacenamiento local
    return !!localStorage.getItem('token');
  }
}