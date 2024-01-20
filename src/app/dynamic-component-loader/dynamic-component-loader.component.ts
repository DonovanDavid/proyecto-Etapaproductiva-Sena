import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicComponentService } from '../dymamic-component.service';

@Component({
  selector: 'app-dynamic-component-loader',
  template: '<ng-container #dynamicComponentContainer></ng-container>',
})
export class DynamicComponentLoaderComponent {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer?: ViewContainerRef;

  constructor(private route: ActivatedRoute, private dynamicComponentService: DynamicComponentService) {}

  loadDynamicComponent(valor: string, userId: any) {
    if (this.dynamicComponentContainer) {
      this.dynamicComponentService.setDynamicComponentContainer(this.dynamicComponentContainer);
      // Intenta cargar el componente directamente aquí.
      this.dynamicComponentService.loadComponent(valor, userId);
    } else {
      console.error('Dynamic component container is not available.');
    }
  }
}
