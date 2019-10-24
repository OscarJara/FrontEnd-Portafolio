import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EmpresaService } from '../../services/empresa.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaModel } from '../../models/empresa.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresas:any = [];
  empresa:EmpresaModel = new EmpresaModel();
  idx:number = 0;
  constructor(
    private empresaService:EmpresaService,
    private modalService:NgbModal
  ) {
    
   }
  
  ngOnInit(
  ) {
    this.GetEmpresas();
  }
  AgregarEmpresa(content){
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }
  ModificarEmpresa(content,empresa){
    this.empresa = empresa;
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }
  ModEmpresa(form:NgForm){
    if(form.invalid){return;}
    // this.empresa.estado = true;
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();
  
    this.empresaService.ModificarEmpresa(this.empresa)
      .subscribe( resp =>{
        if (resp['status'] === 200){
          Swal.fire({
            allowOutsideClick:false,
            type:'success',
            showCloseButton:true,
            text:resp['msg']
          })                
          this.empresas.splice(this.empresas.indexOf(empresas => empresas.id === this.empresa.id), 1);
          this.empresas.push(this.empresa);
          this.modalService.dismissAll();
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
  CreateEmpresa(form:NgForm){
    if(form.invalid){return;}
    this.empresa.estado = true;
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();
  
    this.empresaService.CrearEmpresa(this.empresa)
      .subscribe( resp =>{
        if (resp['status'] === 200){
          resp['data'].estado_escrito = 'Activado'
          
          this.empresas.push(resp['data']);
          Swal.close()
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

  DeleteCompany(id){
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();
  
    this.empresaService.BorrarEmpresa(id)
      .subscribe( resp =>{
        if (resp['status'] === 200){
          Swal.fire({
            allowOutsideClick:false,
            type:'success',
            showCloseButton:true,
            text:'Empresa desactivada con éxito'
          })
          this.empresas.forEach(element => {
            if(element.id==id){
              element.estado_escrito = 'Desactivado';
            }
          });
          this.modalService.dismissAll();
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
  activateCompany(id){    
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();
  
    this.empresaService.ActivarEmpresa(id)
      .subscribe( resp =>{
        if (resp['status'] === 200){
          Swal.fire({
            allowOutsideClick:false,
            type:'success',
            showCloseButton:true,
            text:resp['msg']
          })
          this.empresas.forEach(element => {
            if(element.id==id){
              element.estado_escrito = 'Activado';
            }
          });
          this.modalService.dismissAll();
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
  GetEmpresas(){
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();
  
    this.empresaService.GetEmpresa()
      .subscribe( resp =>{
        if (resp['status'] === 200){
            resp['data'].forEach(element => {
              if (element.estado){
                element.estado_escrito = 'Activado';
              }else{
                element.estado_escrito = 'Desactivado';
              }
              
              this.empresas.push(element)
            });
            // this.users = resp['data'];
            Swal.close()
            console.log(this.empresas);
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
}
