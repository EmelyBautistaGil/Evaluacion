import { Component } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-edificios',
  templateUrl: './show-edificios.component.html',
  styleUrls: ['./show-edificios.component.css']
})
export class ShowEdificiosComponent {
  constructor(private service: ApiserviceService) { }

  EdificiosList: any = [];
  ModalTitle = "";
  ActivateAddEditTraComp: boolean = false;
  edificio: any;

  EdificiosDireccionFilter = "";
  EdificiosListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshTraList();
  }

  addClick() {
    this.edificio = {
      ID: 0,
      EdificioNumero: 0,
      EdificioDireccion: "",
      TipoEdificio: "",
      NivelCalidad: 0,
      Categoria: 0
    }
    this.ModalTitle = "Agregar Edificio";
    this.ActivateAddEditTraComp = true;
  }

  editClick(item: any) {
    this.edificio = item;
    this.ModalTitle = "Editar Edificio";
    this.ActivateAddEditTraComp = true;
  }

  deleteClick(item: any) {
    Swal.fire({
      title: '¿Seguro desea eliminar este Edificio?',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.service.deleteEdificios(item.id).subscribe(apiResp => {
          if (apiResp != null) {
            Swal.fire('Edificio no eliminado!', 'Este edificio no podrá eliminarse debido a su existencia en asignaciones.', 'warning')
          } else {
            Swal.fire('Edificio eliminado!', '', 'success')
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
    this.service.getEdificios().subscribe(data => {
      this.EdificiosList = data;
      this.EdificiosListWithoutFilter = data;
    });
  }

  sortResult(prop: any, asc: any) {
    this.EdificiosList = this.EdificiosListWithoutFilter.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      }
      else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }

  FilterFn() {
    if (this.EdificiosDireccionFilter == "")
      this.refreshTraList();
    else
      this.service.search(this.EdificiosDireccionFilter).subscribe(data => {
        this.EdificiosList = data;
      });
  }
}
