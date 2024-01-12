import { Component, OnInit } from '@angular/core';
import { DynamicComponentService } from '../dymamic-component.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {
  jefeOperaciones: boolean = true;
  mecanico: boolean = false;
  cliente: boolean = false;

  constructor(public dynamicComponentService: DynamicComponentService) {}

  ngOnInit(): void {
    console.log('PaginaPrincipalComponent: ngOnInit is called.');
  }

  cargarComponenteDinamico(valor: string) {
    console.log('Valor:', valor);
    console.log('DynamicComponentService:', this.dynamicComponentService);

    this.dynamicComponentService.loadComponent('solicitar-servicio').then((success) => {
      if (success) {
        console.log('Component loaded successfully.');
        // El componente se cargó exitosamente, puedes realizar acciones adicionales aquí si es necesario.
      } else {
        console.error('Component loading failed.');
        // La carga del componente falló, maneja esto según tus necesidades.
      }
    });
  }
}
