import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UnityService } from '../../services/unity.service';
import { RolesService } from '../../services/roles.service';


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
  user_image:any = 'assets/img/noimage.png';
  user_id:number;
  idRole:any;
  idUnity:any;
  photoUser:any;
  estadoTarjeta:string;
  activateUserButton:boolean = false;

  idRolUser = localStorage.getItem('id_rol');
  constructor(
    private auth:UserService,
    private role:RolesService,
    private unity:UnityService,
    private modalService:NgbModal
  ) { }

  ngOnInit() {
    this.Roles = [];
    this.activateUserButton = false;
    this.Unity = [];
    this.users = [];
    this.empresa = localStorage.getItem('empresa');
    this.ListAllUser();
    this.ListRoles(localStorage.getItem('e'));
    this.ListUnity(this.empresa);
    console.log('ROLES');
    console.log(this.Roles);
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
            this.ngOnInit();
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
              if (element.estado){
                element.estado_escrito = 'Activado';
              }else{
                element.estado_escrito = 'Desactivado';
              }
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
    this.role.GetRole(email)
        .subscribe( resp=>{
          if (resp['status'] === 200){
            resp['data'].forEach(element => {
              if (element.estado){
                this.Roles.push(element);
              }  
            });
          }
        },(err)=>{
            Swal.fire({
              allowOutsideClick:false,
              type:'error',
              showCloseButton:true,
              text:err.msg
            })
          });
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
  AgregarUsuario(content){
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }
  ModificarUsuario(content,id){
    this.user.nombre = id.nombre;
    this.user.email = id.email;
    this.user.appaterno = id.apellido_materno;
    this.user.apmaterno = id.apellido_materno;
    this.user_id = id.id;
    this.idRole = id.rol;
    this.idUnity = id.unidad;
    this.user_image  = id.imagen;

    if (id.estado){
      this.estadoTarjeta='green';
    }else{
      this.activateUserButton = true;
      this.estadoTarjeta ='red';
    }
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  activateUser(){
    console.log(this.user_id);
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();

    this.auth.ActivateUser(this.user_id)
        .subscribe( resp =>{
          if (resp['status'] === 200){

            Swal.fire({
              allowOutsideClick:false,
              type:'success',
              text:resp['msg']
            });
            this.modalService.dismissAll();
            this.ngOnInit()
            
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

  setPhoto(userPhoto:File){
    var reader = new FileReader();

    reader.readAsDataURL(userPhoto);
    reader.onload =  () => {
      this.photoUser = reader.result;
      this.user_image = reader.result;
    }
  }

  ModUser(user:UserModel){
    console.log(user);
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();
    this.idRole
    this.idUnity 
    this.user_image  

    this.auth.ModifyUser(user,this.idRole,this.idUnity,this.user_image,this.user_id)
        .subscribe( resp =>{
          if (resp['status'] === 200){

            Swal.fire({
              allowOutsideClick:false,
              type:'success',
              text:resp['msg']
            });
      
            this.users.forEach(element => {
              
              if (element['id'] === this.user_id){
                this.users.pop();
                resp['data'].estado_escrito = 'Activado';
                this.users.push(resp['data']);
              }
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
  AddUser(user:UserModel){
    if(user['forms']['errors']){return;}
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
