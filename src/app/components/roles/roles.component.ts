import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles.service';

import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleModel } from '../../models/role.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles:any = [];
  idRolUser = localStorage.getItem('id_rol');
  role:RoleModel = new RoleModel();
  estadoTarjeta:string;
  activateUserButton:boolean = false;
  id_rol:number;
  constructor(
    private roleService:RolesService,
    private modalService:NgbModal
  ) { }

  ngOnInit() {
    
    this.ListRoles(localStorage.getItem('e'));
  }

  agregarRole(content){
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }
  activateRole(id){
    
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();
  
    this.roleService.Activaterole(id)
      .subscribe( resp =>{
        if (resp['status'] === 200){
          Swal.fire({
            allowOutsideClick:false,
            type:'success',
            showCloseButton:true,
            text:resp['msg']
          })
          this.roles.forEach(element => {
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
  modificarRole(content,rol){
    this.role.nombre = rol.nombre;
    this.role.descripcion = rol.descripcion;
    this.role.id = rol.id;

    if (rol.estado){
      this.estadoTarjeta='green';
    }else{
      this.activateUserButton = true;
      this.estadoTarjeta ='red';
    }
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }
  ListRoles(email){
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();
    this.roleService.GetRole(email,)
      .subscribe( resp =>{
        if (resp['status'] === 200){
          resp['data'].forEach(element => {
            if (element.estado){
              element.estado_escrito = 'Activado';
            }else{
              element.estado_escrito = 'Desactivado';
            }
            this.roles.push(element);
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
  addRole(form:NgForm){
    if(form.invalid){return;}

    this.role.empresa = parseInt(localStorage.getItem('empresa'));
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();

    this.roleService.AddRole(this.role)
        .subscribe( resp =>{
          if (resp['status'] === 200){
              this.roles.push(resp['data']);
              Swal.fire({
                allowOutsideClick:false,
                type:'success',
                showCloseButton:true,
                text:resp['msg']
              })
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

  modificarRoleF(form:NgForm){
    if(form.invalid){return;}

    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();

    this.roleService.ModifyRole(this.role)
        .subscribe( resp =>{
          if (resp['status'] === 200){
              Swal.fire({
                allowOutsideClick:false,
                type:'success',
                showCloseButton:true,
                text:resp['msg']
              })
              this.id_rol= this.role['id']
              this.roles.forEach(element => {
                
                if (element['id'] === this.id_rol){
                  this.roles.pop();
                  resp['data'].estado_escrito = 'Activado'; 
                  this.roles.push(resp['data']);
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
  DeleteRole(id:number){
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();

    this.roleService.DeleteRole(id)
        .subscribe( resp =>{
          if (resp['status'] === 200){
              Swal.fire({
                allowOutsideClick:false,
                type:'success',
                showCloseButton:true,
                text:resp['msg']
              })
              this.ngOnInit();
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
