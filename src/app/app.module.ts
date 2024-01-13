import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { SolicitarServicioComponent } from './solicitar-servicio/solicitar-servicio.component';
import { DynamicComponentLoaderComponent } from './dynamic-component-loader/dynamic-component-loader.component';
import { DynamicComponentService } from './dymamic-component.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarioComponent } from './solicitar-servicio/calendario/calendario.component';
import { MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { RegistrarVehiculoComponent } from './registrar-vehiculo/registrar-vehiculo.component';
import { ConsultarVehiculoComponent } from './consultar-vehiculo/consultar-vehiculo.component';
import { GestionMecanicosComponent } from './gestion-mecanicos/gestion-mecanicos.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    SolicitarServicioComponent,
    DynamicComponentLoaderComponent,
    CalendarioComponent,
    RegistrarVehiculoComponent,
    ConsultarVehiculoComponent,
    GestionMecanicosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [DynamicComponentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
