import { Component } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-show-report',
  templateUrl: './show-report.component.html',
  styleUrls: ['./show-report.component.css']
})
export class ShowReportComponent {
  constructor(private service: ApiserviceService) { }

  ngOnInit(): void {
    this.loadTrabajadoresList();
  }

  loadTrabajadoresList() {
  }

  trabajadoreTarifa() {

    this.service.getTrabajadoresTarifa().subscribe(apiResp => {
      var head = ['No.', 'Nombre', 'Tarífa', 'Oficio', 'Supervisor']
      var bodyData = [];
      for (let i = 0; i < apiResp.length; i++) {
        bodyData.push([
          apiResp[i].trabajadorNumero,
          apiResp[i].trabajadorNombre,
          apiResp[i].trabajadorTarifa,
          apiResp[i].oficio,
          apiResp[i].trabajadorSupervisor]);

      }

      const doc = new jsPDF('l', 'mm', 'a4');
      doc.text("Trabajadores Tarifa entre 10 y 12", 100, 10);
      autoTable(doc, {
        head: [head],
        body: bodyData
      })
      doc.save('trabajadorTarifa.pdf')

    });

  }

  asignados435(){
    this.service.TrabajadorAs435().subscribe(apiResp => {
      var head = ['No.', 'Nombre', 'Tarífa', 'Oficio', 'Supervisor', 'No. Edificio']
      var bodyData = [];
      for (let i = 0; i < apiResp.length; i++) {
        bodyData.push([
          apiResp[i].trabajadorNumero,
          apiResp[i].trabajadorNombre,
          apiResp[i].trabajadorTarifa,
          apiResp[i].oficio,
          apiResp[i].trabajadorSupervisor,
          apiResp[i].edificioNumero]);

      }
      debugger

      const doc = new jsPDF('l', 'mm', 'a4');
      doc.text("Trabajadores asignados al Edifico 435", 100, 10);
      autoTable(doc, {
        head: [head],
        body: bodyData
      })
      doc.save('asignados435.pdf')

    });
  }

  CantidadEd312(){
    this.service.CantidadEd312().subscribe(apiResp => {
      var head = ['No.', 'Nombre', 'Tarífa', 'Oficio', 'Supervisor', 'No. Edificio']
      var bodyData = [];
      for (let i = 0; i < apiResp.length; i++) {
        bodyData.push([
          apiResp[i].trabajadorNumero,
          apiResp[i].trabajadorNombre,
          apiResp[i].trabajadorTarifa,
          apiResp[i].oficio,
          apiResp[i].trabajadorSupervisor,
          apiResp[i].edificioNumero]);

      }
      bodyData.push(['TOTAL','','','',apiResp.length,])

      const doc = new jsPDF('l', 'mm', 'a4');
      doc.text("Cantidad de trabajadores asignados al edificio 312", 100, 10);
      autoTable(doc, {
        head: [head],
        body: bodyData
      })
      doc.save('CantidadEd312.pdf')

    });
  }

  TotalDias(){

    this.service.TotalDias().subscribe(apiResp => {
      var head = ['No.', 'Nombre', 'Oficio', 'No. Edificio', 'No. de Días']
      var bodyData = [];
      for (let i = 0; i < apiResp.length; i++) {
        bodyData.push([
          apiResp[i].trabajadorNumero,
          apiResp[i].trabajadorNombre,
          apiResp[i].oficio,
          apiResp[i].edificioNumero,
          apiResp[i].asignacionNoDias]);

      }
      bodyData.push(['TOTAL DE DÍAS','','','',apiResp[0].calculate])

      const doc = new jsPDF('l', 'mm', 'a4');
      doc.text("Cantidad de trabajadores asignados al edificio 312", 100, 10);
      autoTable(doc, {
        head: [head],
        body: bodyData
      })
      doc.save('TotalDias.pdf')

    });
  }

}
