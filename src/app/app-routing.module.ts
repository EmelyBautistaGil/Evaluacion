import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionesComponent } from './asignaciones/asignaciones.component';
import { EdificiosComponent } from './edificios/edificios.component';
import { ReportComponent } from './report/report.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';

const routes: Routes = [
  {path: 'trabajadores', component: TrabajadoresComponent},
  {path: 'edificios', component: EdificiosComponent},
  {path: 'asignaciones', component: AsignacionesComponent},
  {path: 'report', component: ReportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
