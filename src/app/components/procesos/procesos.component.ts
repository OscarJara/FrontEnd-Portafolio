import { Component, OnInit } from '@angular/core';
import { ProcessService } from '../../services/process.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProcessModel } from '../../models/process.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.css']
})
export class ProcesosComponent implements OnInit {
  //TODO: Implementar inicializacion
  //Paso 1: Llamar a servicio de procesos asociados a usuario
  //Paso 2: Con listado de procesos, llenar pantalla con tarjetas-procesos|
  procesos:any = [];
  limit:number = 5;
  offset:number = 0;
  process:ProcessModel = new ProcessModel();
  
  estados = {
    0:'lightblue',
    1:'green',
    2:'red',
    4:'blue'
  }
  idRolUser = localStorage.getItem('id_rol');
  constructor(
    private proccessService:ProcessService,
    private modalService:NgbModal,
    private router:Router
  ) { 

  }
  empresa:string ;
  ngOnInit() {
    this.empresa = localStorage.getItem('empresa');
    this.ListProcess(this.empresa);
  }
  AgregarProceso(content){
    console.log(content);
    this.modalService.open(content);
  }
  VerMas(){
    this.offset += 5;
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();
    this.proccessService.GetProcess(this.empresa,this.limit,this.offset)
      .subscribe( resp =>{
        if (resp['status'] === 200){
          resp['data'].forEach(element => {

            element.estadoTarjeta = this.estados[element.estado];
            this.procesos.push(element);
          });
          Swal.close();

        }else{
          Swal.fire({
            allowOutsideClick:false,
            type:'error',
            showCloseButton:true,
            text:resp['msg']
          })
        }
      },(err) =>{ 

          Swal.fire({
            allowOutsideClick:false,
            type:'error',
            showCloseButton:true,
            text:err.msg
          })
        });
  }
  ListProcess(empresa){
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();
    this.proccessService.GetProcess(empresa,this.limit,this.offset)
      .subscribe( resp =>{
        if (resp['status'] === 200){
          resp['data'].forEach(element => {

            element.estadoTarjeta = this.estados[element.estado];
            this.procesos.push(element);
          });
          Swal.close();

        }else{
          Swal.fire({
            allowOutsideClick:false,
            type:'error',
            showCloseButton:true,
            text:resp['msg']
          })
        }
      },(err) =>{ 

          Swal.fire({
            allowOutsideClick:false,
            type:'error',
            showCloseButton:true,
            text:err.msg
          })
        });
  }
  VerProcesoID(process:ProcessModel){

    this.router.navigate( ['/proceso',process.id] ,{queryParams:{n: process.nombre,fi:process.fecha_inicio,ft:process.fecha_termino}});
    console.log('VER PROCESO');
    console.log(process);
  }
  EliminarProcesoID(process:ProcessModel){
    console.log('Eliminar PROCESO');
    console.log(process);
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();


    this.proccessService.DeleteProcess(this.empresa,process)
        .subscribe( resp =>{
          if (resp['status'] === 200){

            Swal.fire({
              allowOutsideClick:false,
              type:'success',
              text:resp['msg']
            });

            this.procesos.splice(this.procesos.indexOf(proceso => proceso.id === process), 1);
            
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
  
  CrearProcess(form:NgForm){
    if(form.invalid){return;}
    this.process.empresa = this.empresa;
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();


    this.proccessService.CreateProcess(this.process)
        .subscribe( resp =>{
          if (resp['status'] === 200){

            Swal.fire({
              allowOutsideClick:false,
              type:'success',
              text:resp['msg']
            });

            this.procesos.push(resp['data'])
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
  // }
  }
}
