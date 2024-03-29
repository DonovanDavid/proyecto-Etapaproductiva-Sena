
import { Component } from '@angular/core';
import { AuthService } from './auth-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router ) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {  // Especifica el tipo de 'response'
        // Almacena el token en el almacenamiento local
        localStorage.setItem('token', response.token);
        // Almacena la información del usuario en el almacenamiento local
        localStorage.setItem('userInfo', JSON.stringify(response.userInfo));
        console.log('Login exitoso');
        // Redirige al usuario al dashboard
        this.router.navigate(['/pagina-principal']);
        console.log('Login exitoso');
      },
      (error :any) => {
        console.error('Error en el login:', error);
      }
    );
  }
}
