import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { SolicitarServicioComponent } from './solicitar-servicio/solicitar-servicio.component';
import { RegistrarVehiculoComponent } from './registrar-vehiculo/registrar-vehiculo.component';
import { ConsultarVehiculoComponent } from './consultar-vehiculo/consultar-vehiculo.component';
import { GestionMecanicosComponent } from './gestion-mecanicos/gestion-mecanicos.component';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {
  private dynamicComponentContainer?: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  setDynamicComponentContainer(container: ViewContainerRef) {
    this.dynamicComponentContainer = container;
    console.log('Dynamic component container set:', this.dynamicComponentContainer);

    // Intenta cargar el componente directamente aquí.
    this.loadComponent('solicitar-servicio');
  }

  loadComponent(accion: string): Promise<boolean> {
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
          // Agrega más casos según sea necesario

          default:
            break;
        }

        if (component) {
          const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
          this.dynamicComponentContainer.clear();
          this.dynamicComponentContainer.createComponent(componentFactory);
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
