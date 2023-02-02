import { Component } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-asignaciones',
  templateUrl: './show-asignaciones.component.html',
  styleUrls: ['./show-asignaciones.component.css']
})
export class ShowAsignacionesComponent {
  constructor(private service: ApiserviceService) { }
  
  AsignacionesList: any = [];
  ModalTitle = "";
  ActivateAddEditTraComp: boolean = false;
  asignacion: any;

  AsignacionesFechaInicioFilter = "";
  AsignacionesListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshTraList();
  }

  addClick() {
    this.asignacion = {
      ID: 0,
      AsignacionNo: 0,
      EdificioNumero: 0,
      TrabajadorNumero: 0,
      AsignacionFechaInicio: "",
      AsignacionNoDias: 0
    }
    this.ModalTitle = "Agregar Asignación";
    this.ActivateAddEditTraComp = true;
  }

  editClick(item: any) {
    this.asignacion = item;
    debugger
    this.ModalTitle = "Editar Asignación";
    this.ActivateAddEditTraComp = true;
  }

  deleteClick(item: any) {
    Swal.fire({
      title: '¿Seguro desea eliminar este Asignación?',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.service.deleteAsignaciones(item.id).subscribe(data => {
          Swal.fire('Asignación eliminada!', '', 'success')
          this.refreshTraList();
        })
      } else if (result.isDenied) {
      }
    })
  }

  closeClick() {
    this.ActivateAddEditTraComp = false;
    this.refreshTraList();
  }

  refreshTraList() {
    this.service.getAsignaciones().subscribe(data => {
      this.AsignacionesList = data;
      this.AsignacionesListWithoutFilter = data;
    });
  }

  sortResult(prop: any, asc: any) {
    this.AsignacionesList = this.AsignacionesListWithoutFilter.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      }
      else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }

  FilterFn() {
    if (this.AsignacionesFechaInicioFilter == "")
      this.refreshTraList();
    else
      this.service.searchFechaInicio(this.AsignacionesFechaInicioFilter).subscribe(data => {
        this.AsignacionesList = data;
      });
  }
}
