import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UnityService } from '../../services/unity.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: []
})
export class UsuariosComponent implements OnInit {

  Roles:any = [];
  Unity:any = [];
  empresa:string;
  user:UserModel = new UserModel();
  users:any[] = [];
  nombre_modal:string;
  
  idRole:any;
  idUnity:any;
  photoUser:any;

  constructor(
    private auth:UserService,
    private unity:UnityService,
    private modalService:NgbModal
  ) { }

  ngOnInit() {
    this.empresa = localStorage.getItem('empresa');
    this.ListAllUser();
    this.ListRoles(localStorage.getItem('e'));
    console.log('UNITY')
    this.ListUnity(this.empresa);
  }
  setIdRole(val){
    this.idRole = val;
  }
  setIdUnity(val){
    console.log(val);
    this.idUnity = val;
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
  ListAllUser(){
    
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();

    this.auth.GetUsers(this.empresa,'all')
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
  ListRoles(email){
    this.auth.GetRole(email)
        .subscribe( resp=>{
          if (resp['status'] === 200){
            this.Roles = resp['data'];
          }
        },(err)=>{
          Swal.fire({
            allowOutsideClick:false,
            type:'error',
            showCloseButton:true,
            text:err.msg
          })
        })
  }

  ListUnity(email){
    this.unity.GetUnity(email)
        .subscribe( resp=>{
          if (resp['status'] === 200){
            this.Unity = resp['data'];
          }
        },(err)=>{
          Swal.fire({
            allowOutsideClick:false,
            type:'error',
            showCloseButton:true,
            text:err.msg
          })
        })
  }
  AbregarUsuario(content){
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  setPhoto(userPhoto:File){
    var reader = new FileReader();

    reader.readAsDataURL(userPhoto);
    reader.onload =  () => {
      this.photoUser = reader.result;
    }
  }

  AddUser(user:UserModel){
    console.log(user);
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();

    // this.auth.AddUser(user.email,user.nombre,user.appaterno,user.apmaterno,this.idRole,this.idUnity,this.photoUser)
    this.auth.AddUser(user,this.idRole,this.idUnity,this.photoUser)
      .subscribe( resp =>{
        if (resp['status'] === 200){

          Swal.fire({
            allowOutsideClick:false,
            type:'success',
            text:resp['msg']
          });
          this.users.push(resp['data']);
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
  AbrirModal(modal,modal_nombre,nombre,apellido_materno,apellido_paterno,id){
    this.user.id = id;
    this.user.nombre = nombre;
    this.user.apmaterno = apellido_materno;
    this.user.appaterno = apellido_paterno;
    this.nombre_modal = modal_nombre;
    this.modalService.open(modal);
  }
}
