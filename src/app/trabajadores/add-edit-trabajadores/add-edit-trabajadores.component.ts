import { Component, DebugElement, Input } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
import { ShowTrabajadoresComponent } from '../show-trabajadores/show-trabajadores.component';

@Component({
  selector: 'app-add-edit-trabajadores',
  templateUrl: './add-edit-trabajadores.component.html',
  styleUrls: ['./add-edit-trabajadores.component.css']
})
export class AddEditTrabajadoresComponent {
  constructor(private service: ApiserviceService, private close: ShowTrabajadoresComponent) { }

  @Input() trabajador: any;
  ID = 0;
  TrabajadorNumero = 0;
  TrabajadorNombre = "";
  TrabajadorTarifa = 0;
  Oficio = "";
  TrabajadorSupervisor = 0;


  ngOnInit(): void {
    this.loadTrabajadoresList();
  }

  loadTrabajadoresList() {
    this.ID = this.trabajador.id;
    this.TrabajadorNumero = this.trabajador.trabajadorNumero;
    this.TrabajadorNombre = this.trabajador.trabajadorNombre;
    this.TrabajadorTarifa = this.trabajador.trabajadorTarifa;
    this.Oficio = this.trabajador.oficio;
    this.TrabajadorSupervisor = this.trabajador.trabajadorSupervisor;
  }

  addTrabajadores() {
    var val = {
      ID: this.ID,
      TrabajadorNumero: this.TrabajadorNumero,
      TrabajadorNombre: this.TrabajadorNombre,
      TrabajadorTarifa: this.TrabajadorTarifa,
      Oficio: this.Oficio,
      TrabajadorSupervisor: this.TrabajadorSupervisor,
    };

    this.service.searchNumber(val.TrabajadorNumero).subscribe(apiResp => {
      if (apiResp != null) {

        Swal.fire({
          title: 'Numero de Trabajador existente',
          icon: 'warning'
        })
        this.TrabajadorNumero = 0
      }
      else {
        if (val.Oficio == undefined || val.TrabajadorNombre == undefined || val.TrabajadorTarifa == undefined || val.TrabajadorSupervisor == undefined)
          Swal.fire({
            title: 'Debe llenar todos los campos para continuar',
            icon: 'warning'
          })
        else
          this.service.addTrabajadores(val).subscribe(res => {
            this.close.closeClick();
            Swal.fire({
              title: 'Trabajador Agregado',
              icon: 'success', 
              showConfirmButton: false,
              timer: 1500

            })
          });
      }

    });
  }

  updateTrabajadores() {
    var val = {
      ID: this.ID,
      TrabajadorNumero: this.TrabajadorNumero,
      TrabajadorNombre: this.TrabajadorNombre,
      TrabajadorTarifa: this.TrabajadorTarifa,
      Oficio: this.Oficio,
      TrabajadorSupervisor: this.TrabajadorSupervisor,
    };
    if (val.Oficio == "" || val.TrabajadorNombre == "" || val.TrabajadorTarifa == null || val.TrabajadorSupervisor == null) {
      Swal.fire({
        title: 'Debe llenar todos los campos para continuar',
        icon: 'warning'
      })
    } else {

      this.service.updateTrabajadores(val, val.ID).subscribe(res => {
        Swal.fire({
          title: 'Trabajador Editado',
          icon: 'success', 
          showConfirmButton: false,
          timer: 1500
        })
      });
    }
  }
  

}
