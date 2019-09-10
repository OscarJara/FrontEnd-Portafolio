import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { NgForm } from '@angular/forms';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: []
})
export class RecoveryPasswordComponent implements OnInit {

  login:LoginModel;

  constructor() { }

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
  }

}
