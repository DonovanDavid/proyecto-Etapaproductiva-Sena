import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { SolicitarServicioComponent } from './solicitar-servicio/solicitar-servicio.component';
import { RegistrarVehiculoComponent } from './registrar-vehiculo/registrar-vehiculo.component';
import { ConsultarVehiculoComponent } from './consultar-vehiculo/consultar-vehiculo.component';
import { GestionMecanicosComponent } from './gestion-mecanicos/gestion-mecanicos.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { GestionAgendaComponent } from './gestion-agenda/gestion-agenda.component';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {
  private dynamicComponentContainer?: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  setDynamicComponentContainer(container: ViewContainerRef) {
    this.dynamicComponentContainer = container;
  }

  loadComponent(accion: string, userId: number): Promise<boolean> {
    console.log('Loading component with action:', accion);

    return new Promise((resolve) => {
      if (this.dynamicComponentContainer) {
        let component: any = null;

        switch (accion) {
          case 'solicitar-servicio':
            component = SolicitarServicioComponent; // Importa el componente correspondiente
            break;
          case 'registrar-vehiculo':
            component = RegistrarVehiculoComponent;
            break;
          case 'consultar-vehiculo':
            component = ConsultarVehiculoComponent;
            break;
          case 'gestion-mecanicos':
            component = GestionMecanicosComponent;
            break;
          case 'gestion-usuarios':
            component = GestionUsuariosComponent;
            break;
          case 'gestion-agenda':
            component = GestionAgendaComponent;
            break;
          // Agrega más casos según sea necesario

          default:
            break;
        }

        if (component) {
          const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
          this.dynamicComponentContainer.clear();
          // Crea una instancia del componente y pasa el userId como un Input
          const componentRef = this.dynamicComponentContainer.createComponent(componentFactory);
          (componentRef.instance as any).userId = userId;

          console.log('Component loaded successfully.');
          resolve(true);
        } else {
          console.error('Component not found for action:', accion);
          resolve(false);
        }
      } else {
        console.error('Dynamic component container is not set.');
        resolve(false);
      }
    });
  }
}
