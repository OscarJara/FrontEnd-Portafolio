import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { NgForm } from '@angular/forms';


import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: []
})
export class RecoveryPasswordComponent implements OnInit {

  login:LoginModel;

  constructor(
    private activatedRoute:ActivatedRoute,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.login = new LoginModel();
  }
  Recovery(form:NgForm){
    if(form.invalid){return;}
    
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere'
    });
    Swal.showLoading();
    this.authService.RecoveryPassword(this.login.email)
        .subscribe(resp=>{
          if (resp['status']==200){
            Swal.fire({
              allowOutsideClick:false,
              type:'success',
              text:resp['msg']
            })
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
