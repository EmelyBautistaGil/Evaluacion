import { Component, Input } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
import { ShowAsignacionesComponent } from '../show-asignaciones/show-asignaciones.component';

@Component({
  selector: 'app-add-edit-asignaciones',
  templateUrl: './add-edit-asignaciones.component.html',
  styleUrls: ['./add-edit-asignaciones.component.css']
})
export class AddEditAsignacionesComponent {
  constructor(private service: ApiserviceService, private close: ShowAsignacionesComponent) { }

  @Input() asignacion: any;
  ID = 0;
  AsignacionNo = 0;
  EdificioNumero = 0;
  TrabajadorNumero = 0;
  AsignacionFechaInicio = "";
  AsignacionNoDias = 0;
  EdificiosList: any = [];
  TrabajadoresList: any = [];

  ngOnInit(): void {
    this.loadAsignacionesList();
  }

  loadAsignacionesList() {
    this.service.getEdificioNumero().subscribe((data: any) => {
      this.EdificiosList = data
     
    });
    this.service.getTrabajadoresNumero().subscribe((data: any) => {
      this.TrabajadoresList = data
    });

    
    this.ID = this.asignacion.id;
    this.AsignacionNo = this.asignacion.asignacionNo;
    this.EdificioNumero = this.asignacion.edificioNumero;
    this.TrabajadorNumero = this.asignacion.trabajadorNumero;
    this.AsignacionFechaInicio = this.asignacion.asignacionFechaInicio;
    this.AsignacionNoDias = this.asignacion.asignacionNoDias;

  }

  addAsignaciones() {
    var val = {
      ID: this.ID,
      AsignacionNo: this.AsignacionNo,
      EdificioNumero: this.EdificioNumero,
      TrabajadorNumero: this.TrabajadorNumero,
      AsignacionFechaInicio: this.AsignacionFechaInicio,
      AsignacionNoDias: this.AsignacionNoDias,
    };

    this.service.searchAsignaciones(val.AsignacionNo).subscribe(apiResp => {
      if (apiResp != null) {

        Swal.fire({
          title: 'Numero de asignacion existente',
          icon: 'warning'
        })
        this.AsignacionNo = 0
      }
      else {
        if (val.AsignacionNo == undefined || val.EdificioNumero == undefined || val.TrabajadorNumero == undefined || val.AsignacionFechaInicio == undefined || val.AsignacionNoDias == undefined)
          Swal.fire({
            title: 'Debe llenar todos los campos para continuar',
            icon: 'warning'
          })
        else
          this.service.addAsignaciones(val).subscribe(res => {
            this.close.closeClick();
            Swal.fire({
              title: 'asignacion Agregado',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500

            })
          });
      }

    });
  }

  updateAsignaciones() {
    var val = {
      ID: this.ID,
      AsignacionNo: this.AsignacionNo,
      EdificioNumero: this.EdificioNumero,
      TrabajadorNumero: this.TrabajadorNumero,
      AsignacionFechaInicio: this.AsignacionFechaInicio,
      AsignacionNoDias: this.AsignacionNoDias,
    };
    if (val.AsignacionNo == undefined || val.EdificioNumero == undefined || val.TrabajadorNumero == undefined || val.AsignacionFechaInicio == undefined || val.AsignacionNoDias == undefined) {
      Swal.fire({
        title: 'Debe llenar todos los campos para continuar',
        icon: 'warning'
      })
    } else {

      this.service.updateAsignaciones(val, val.ID).subscribe(res => {
        Swal.fire({
          title: 'Asignación Editada',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
      });
    }
  }
}
