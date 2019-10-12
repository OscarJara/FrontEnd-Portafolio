import { Component, OnInit } from '@angular/core';
import { ProcesoTarjeta } from 'src/app/interfaces/proceso-tarjeta';

@Component({
  selector: 'app-tarjeta-proceso',
  templateUrl: './tarjeta-proceso.component.html',
  styleUrls: ['./tarjeta-proceso.component.css']
})
export class TarjetaProcesoComponent implements OnInit {
  procesoTarjeta: ProcesoTarjeta;
  estadoTarjeta: string;

  constructor() { }

  ngOnInit() {
    this.procesoTarjeta = new ProcesoTarjeta;
    this.procesoTarjeta.idProceso = 1;
    this.procesoTarjeta.nombre = "nombre generico";
    this.procesoTarjeta.fechaInicio = "08/10/2019";
    this.procesoTarjeta.fechaTermino = "09/10/2019";
    this.procesoTarjeta.estado = 1;
    this.estadoTarjeta = "red"
  }

}
