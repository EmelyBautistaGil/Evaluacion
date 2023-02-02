import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';
import { AddEditTrabajadoresComponent } from './trabajadores/add-edit-trabajadores/add-edit-trabajadores.component';
import { ShowTrabajadoresComponent } from './trabajadores/show-trabajadores/show-trabajadores.component';
import { EdificiosComponent } from './edificios/edificios.component';
import { AddEditEdificiosComponent } from './edificios/add-edit-edificios/add-edit-edificios.component';
import { ShowEdificiosComponent } from './edificios/show-edificios/show-edificios.component';
import { AsignacionesComponent } from './asignaciones/asignaciones.component';
import { AddEditAsignacionesComponent } from './asignaciones/add-edit-asignaciones/add-edit-asignaciones.component';
import { ShowAsignacionesComponent } from './asignaciones/show-asignaciones/show-asignaciones.component';
import { ApiserviceService } from './apiservice.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TrabajadoresComponent,
    AddEditTrabajadoresComponent,
    ShowTrabajadoresComponent,
    EdificiosComponent,
    AddEditEdificiosComponent,
    ShowEdificiosComponent,
    AsignacionesComponent,
    AddEditAsignacionesComponent,
    ShowAsignacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
