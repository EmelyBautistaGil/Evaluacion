import { Component } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-trabajadores',
  templateUrl: './show-trabajadores.component.html',
  styleUrls: ['./show-trabajadores.component.css']
})
export class ShowTrabajadoresComponent {
  constructor(private service: ApiserviceService) { }

  TrabajadoresList: any = [];
  ModalTitle = "";
  ActivateAddEditTraComp: boolean = false;
  trabajador: any;

  TrabajadoresNameFilter = "";
  TrabajadoresListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshTraList();
  }

  addClick() {
    this.trabajador = {
      ID: 0,
      TrabajadorNumero: 0,
      TrabajadorNombre: "",
      TrabajadorTarifa: 0,
      Oficio: "",
      TrabajadorSupervisor: 0
    }
    this.ModalTitle = "Agregar Trabajador";
    this.ActivateAddEditTraComp = true;
  }

  editClick(item: any) {
    this.trabajador = item;
    this.ModalTitle = "Editar Trabajador";
    this.ActivateAddEditTraComp = true;
  }

  deleteClick(item: any) {
    Swal.fire({
      title: `¿Seguro desea eliminar este trabajador?`,
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.service.deleteTrabajadores(item.id).subscribe(data => {
          if (data != null) {
            Swal.fire('Trabajador no eliminado!', 'Este Trabajador no podrá eliminarse debido a su existencia en asignaciones.', 'warning')
          } else {
            Swal.fire('Trabajador eliminado!', '', 'success')
            this.refreshTraList();
          }
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
    this.service.getTrabajadores().subscribe(data => {
      this.TrabajadoresList = data;
      this.TrabajadoresListWithoutFilter = data;
    });
  }

  sortResult(prop: any, asc: any) {
    this.TrabajadoresList = this.TrabajadoresListWithoutFilter.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      }
      else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }

  FilterFn() {
    if (this.TrabajadoresNameFilter == "")
      this.refreshTraList();
    else
      this.service.searchTrabajadores(this.TrabajadoresNameFilter).subscribe(data => {
        this.TrabajadoresList = data;
      });
  }
}
