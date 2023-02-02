import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiserviceService } from 'src/app/apiservice.service';
import { ShowEdificiosComponent } from '../show-edificios/show-edificios.component';

@Component({
  selector: 'app-add-edit-edificios',
  templateUrl: './add-edit-edificios.component.html',
  styleUrls: ['./add-edit-edificios.component.css']
})
export class AddEditEdificiosComponent {
  constructor(private service: ApiserviceService, private close: ShowEdificiosComponent) { }

  @Input() edificio: any;
  ID = 0;
  EdificioNumero = 0;
  EdificioDireccion = "";
  TipoEdificio = "";
  NivelCalidad = 0;
  Categoria = 0;


  ngOnInit(): void {
    this.loadEdificiosList();
  }

  loadEdificiosList() {
    this.ID = this.edificio.id;
    this.EdificioNumero = this.edificio.edificioNumero;
    this.EdificioDireccion = this.edificio.edificioDireccion;
    this.TipoEdificio = this.edificio.tipoEdificio;
    this.NivelCalidad = this.edificio.nivelCalidad;
    this.Categoria = this.edificio.categoria;
  }

  addEdificios() {
    var val = {
      ID : this.ID ,
      EdificioNumero : this.EdificioNumero ,
      EdificioDireccion : this.EdificioDireccion ,
      TipoEdificio : this.TipoEdificio ,
      NivelCalidad : this.NivelCalidad ,
      Categoria : this.Categoria ,
    };

    this.service.searchEdificios(val.EdificioNumero).subscribe(apiResp => {
      if (apiResp != null) {

        Swal.fire({
          title: 'Numero de Edificio existente',
          icon: 'warning'
        })
        this.EdificioNumero = 0
      }
      else {
        if (val.EdificioNumero == undefined || val.NivelCalidad == undefined || val.Categoria == undefined || val.TipoEdificio == undefined)
          Swal.fire({
            title: 'Debe llenar todos los campos para continuar',
            icon: 'warning'
          })
        else
          this.service.addEdificios(val).subscribe(res => {
            this.close.closeClick();
            Swal.fire({
              title: 'Edificio Agregado',
              icon: 'success', 
              showConfirmButton: false,
              timer: 1500

            })
          });
      }

    });
  }

  updateEdificios() {
    var val = {
      ID : this.ID ,
      EdificioNumero : this.EdificioNumero ,
      EdificioDireccion : this.EdificioDireccion ,
      TipoEdificio : this.TipoEdificio ,
      NivelCalidad : this.NivelCalidad ,
      Categoria : this.Categoria ,
    };
    if (val.EdificioNumero == undefined || val.NivelCalidad == undefined || val.Categoria == undefined || val.TipoEdificio == undefined){
    Swal.fire({
        title: 'Debe llenar todos los campos para continuar',
        icon: 'warning'
      })
    } else {

      this.service.updateEdificios(val, val.ID).subscribe(res => {
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
