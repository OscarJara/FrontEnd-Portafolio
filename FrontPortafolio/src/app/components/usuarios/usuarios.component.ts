import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '../../models/user.model';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: []
})
export class UsuariosComponent implements OnInit {


  user:UserModel = new UserModel();
  users:any[] = [];
  nombre_modal:string;
  constructor(
    private auth:AuthService,
    private modalService:NgbModal
  ) { }

  ngOnInit() {
    this.ListUser();
  }

  DeleteUser(id_user){
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Esperfe porfavor...'
    });
    Swal.showLoading();

    this.auth.DeleteUser(id_user)
        .subscribe( resp =>{
          if (resp['status']===200){
            Swal.fire({
              allowOutsideClick:false,
              type:'success',
              text:resp['msg']
            });
          }else{
            Swal.fire({
              allowOutsideClick:false,
              showCloseButton:true,
              type:'error',
              text:resp['msg']
            });
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
  ListUser(){

    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();

    this.auth.GetUsers()
      .subscribe( resp =>{
        if (resp['status'] === 200){
            resp['data'].forEach(element => {
              if (element.imagen.length>0){
                element.imagen =`data:image/jpg;base64,${element.imagen}`;
              }else{
                element.imagen = 'assets/img/noimage.png';
              }
              this.users.push(element)
            });
            // this.users = resp['data'];
            Swal.close()
            console.log(this.users);
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

  AbrirModal(modal,modal_nombre,nombre,apellido_materno,apellido_paterno,id){
    this.user.id = id;
    this.user.nombre = nombre;
    this.user.apmaterno = apellido_materno;
    this.user.appaterno = apellido_paterno;
    this.nombre_modal = modal_nombre;
    this.modalService.open(modal);
  }
}
