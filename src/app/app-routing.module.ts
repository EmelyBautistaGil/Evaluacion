import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionesComponent } from './asignaciones/asignaciones.component';
import { EdificiosComponent } from './edificios/edificios.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';

const routes: Routes = [
  {path: 'trabajadores', component: TrabajadoresComponent},
  {path: 'edificios', component: EdificiosComponent},
  {path: 'asignaciones', component: AsignacionesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
