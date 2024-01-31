import { Component, OnInit } from '@angular/core';
import { DynamicComponentService } from '../dymamic-component.service';
import {AuthService, UserInfo} from '../login/auth-service.service'


@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {
  id?: number;
  nombre?: string="";
  tipoUsuario?: number;
  userInfo?: UserInfo; // Utiliza la interfaz UserInfo

  constructor(public dynamicComponentService: DynamicComponentService, private authService: AuthService) {}

  ngOnInit(): void {
     // Obtiene la información del usuario desde el almacenamiento local
    const userInfoString = localStorage.getItem('userInfo');

    if (userInfoString) {
      // Parsea la información del usuario
      this.userInfo = JSON.parse(userInfoString);
      this.tipoUsuario = this.userInfo?.tipoUsuario;
      this.nombre = this.userInfo?.nombre;
      this.id = this.userInfo?.id;
      console.log(this.tipoUsuario);
    } else {
      console.log('userInfoString es nulo o indefinido');
    }
  }
  logout(): void {
    // Llama al método de cierre de sesión en el servicio de autenticación
    console.log("btn cerrar")
    this.authService.logout();
  }
}
