import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nombre_usuario:string;
  apellido_p:string;
  user_image:any;

  constructor(
      private auth:AuthService,
      private route:Router,
      private _sanitizer:DomSanitizer
  
  ) { 

    const base64 = localStorage.getItem('img');
    if (base64.length>0){
      this.user_image = `data:image/jpg;base64,${localStorage.getItem('img')}`;
    }else{
      this.user_image = 'assets/img/noimage.png'
    }
    
    this.nombre_usuario = localStorage.getItem('nombre')
    this.apellido_p =  localStorage.getItem('apellido_p');


  }

  ngOnInit() {

  }
  Logout(){
    console.log('LOGOUT')
    this.auth.Logout();
    this.route.navigateByUrl('/login')
  }
}
