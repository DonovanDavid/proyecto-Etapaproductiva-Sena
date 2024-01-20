import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { SolicitarServicioComponent } from './solicitar-servicio/solicitar-servicio.component';
import { DynamicComponentLoaderComponent } from './dynamic-component-loader/dynamic-component-loader.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './login/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'pagina-principal', component: PaginaPrincipalComponent, canActivate: [AuthGuardService] },
  /* { path: 'pagina-principal/:accion', component: DynamicComponentLoaderComponent}, */
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
