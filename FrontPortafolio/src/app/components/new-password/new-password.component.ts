import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  login:LoginModel = new LoginModel();

  token:string = '';
  constructor(
    private activatedRoute:ActivatedRoute,
    private authService:AuthService,
    private router:Router

  ) {
    this.activatedRoute.params.subscribe( params =>{
      this.token = params['token'];

    })
   }

  ngOnInit() {
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();
    this.authService.ValidToken(this.token)
      .subscribe( resp=>{
        if (resp['status']==200){
          Swal.close()
        }else{
          Swal.fire({
            allowOutsideClick:false,
            type:'error',
            text:resp['msg']
          })
          this.router.navigateByUrl('/login');
        }
        },(err) =>{ 

        Swal.fire({
          allowOutsideClick:false,
          type:'error',
          text:err.msg
        })
        });
  }

  NewPass(form:NgForm){
    if(form.invalid){return;}

    console.log(this.login.password);
    console.log('ENVIAR');
    console.log(this.token);

    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();
    this.authService.ResetPassword(this.login.password,this.token)
        .subscribe(resp=>{
          if (resp['status']==200){
            Swal.fire({
              allowOutsideClick:false,
              type:'success',
              text:resp['msg']
            })
            this.router.navigateByUrl('/login');
          }else{
            Swal.fire({
              allowOutsideClick:false,
              type:'error',
              text:resp['msg']
            })
          }
        })
    
  }


}
