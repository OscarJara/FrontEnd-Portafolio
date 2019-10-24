import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { ProcessModel } from '../../models/process.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ProcessService } from '../../services/process.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tarjeta-proceso',
  templateUrl: './tarjeta-proceso.component.html',
  styleUrls: ['./tarjeta-proceso.component.css']
})
export class TarjetaProcesoComponent implements OnInit {

  process:ProcessModel = new ProcessModel();
  
  @Input() Procesos:any = {};
  @Input() idProceso:any = {};

  @Output() VerProcesoID:EventEmitter<ProcessModel>;
  @Output() EliminarProcesoID:EventEmitter<number>;
  @Output() ModificarProcesoID:EventEmitter<number>;
  
  constructor(
    private modalService:NgbModal,
    private procesService:ProcessService
  ) { 
    this.VerProcesoID = new EventEmitter();
    this.EliminarProcesoID = new EventEmitter();
    this.ModificarProcesoID = new EventEmitter();
    // private modalService:NgbModal,
  }

  empresa:string;
  ngOnInit() {
    this.empresa = localStorage.getItem('empresa');
    this.process = this.Procesos;
  }
  VerProceso(){
    this.VerProcesoID.emit(this.process);
  }
  EliminarProceso(){
    this.EliminarProcesoID.emit(this.idProceso);    
  }
  ModificarProceso(content){
      console.log(this.process.id);
      this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  ModProcess(form:NgForm){
    if(form.invalid){return;}
    this.Procesos.empresa = this.empresa;
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();


    this.procesService.UpdateProcess(this.Procesos)
        .subscribe( resp =>{
          if (resp['status'] === 200){

            Swal.fire({
              allowOutsideClick:false,
              type:'success',
              text:resp['msg']
            });
      
            this.modalService.dismissAll();
          }else{
            Swal.fire({
              allowOutsideClick:false,
              type:'error',
              text:resp['msg']
            })
          }
          
        },(err) =>{ 

          Swal.fire({
            allowOutsideClick:false,
            type:'error',
            text:'¡UPS!, Algo Salio Mal'
          })
        });
  }
    
}