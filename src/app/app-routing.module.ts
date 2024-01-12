import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { SolicitarServicioComponent } from './solicitar-servicio/solicitar-servicio.component';
import { DynamicComponentLoaderComponent } from './dynamic-component-loader/dynamic-component-loader.component';

const routes: Routes = [
  { path: '', component: PaginaPrincipalComponent },
  { path: 'pagina-principal', component: PaginaPrincipalComponent },
  { path: 'pagina-principal/:accion', component: DynamicComponentLoaderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
