import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login:LoginModel = new LoginModel();
  recordarme:boolean = false;

  constructor(
    private router:Router,
    private auth:AuthService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('email')){
      this.login.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }
  Login(form:NgForm){
    if(form.invalid){return;}

    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();
    this.ConfirmarLogin(this.login);
  }

  ConfirmarLogin(LoginF:LoginModel){

    this.auth.LogIn(LoginF)
      .subscribe( resp =>{
        if (resp['status'] === 200){
          this.SaveUserData(  resp['data'].id_empresa,
                            resp['data'].id_rol,
                            resp['data'].imagen,
                            resp['data'].nombres,
                            resp['data'].apellido_paterno,
                            resp['data'].apellido_materno,
                            resp['data'].id
                );
          Swal.close()
          this.router.navigateByUrl('/home');
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
          text:err.msg
        })
      });
    
    
  }

  SaveUserData(
    id_empresa:string,
    id_rol:string,
    foto:string,
    nombres:string,
    apellido_p:string,
    apellido_m:string,
    id_user:string
  ){
    localStorage.setItem('e',this.login.email);
    localStorage.setItem('empresa',id_empresa);
    localStorage.setItem('id',id_user);
    localStorage.setItem('img',foto);
    localStorage.setItem('nombre',nombres);
    localStorage.setItem('id_rol',id_rol);
    localStorage.setItem('apellido_p',apellido_p);
    localStorage.setItem('apellido_m',apellido_m);
  }

  
}
