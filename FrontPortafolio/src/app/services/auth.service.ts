import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL_API:string = 'https://control-task.herokuapp.com';

  constructor(
      private http: HttpClient
  ) { }

  estaAutenticado():boolean{
    if (localStorage.getItem('id')){
      console.log('esta autenticado')
      return true;
    }else{
      console.log('no autenticado')

      return false;
    }
  }

  LogIn(usuario:LoginModel){
    const payload = {
      email:usuario.email,
      password:usuario.password
    };

    return this.http.post(`${this.URL_API}/login`,payload);

  }
  ResetPassword(contrasena:string,token:string){
    const headers = new HttpHeaders()
          .set("Access-Token", token);

    const params = {
      password:contrasena
    };

    return this.http.post(`${this.URL_API}/new-password`,params,{headers});
  }

  ValidToken(token:string){
    const headers = new HttpHeaders()
            .set("Access-Token", token);

    return this.http.get(`${this.URL_API}/vd-tkn`,{headers});

  }
  RecoveryPassword(email:string){
    const params = {
      email:email
    };

    return this.http.post(`${this.URL_API}/recovery-password`,params);
  }
  DeleteUser(id_usuario:string){
    const params = {
      id:id_usuario
    };

    return this.http.post(`${this.URL_API}/delete-user`,params);
  }
  GetUsers(empresa:string,id:string){
    return this.http.get(`${this.URL_API}/user?id=${id}&e=${empresa}`);
  }
  Logout(){
    console.log('REMOVE');
    localStorage.removeItem('empresa');
    localStorage.removeItem('id');
    localStorage.removeItem('img');
    localStorage.removeItem('nombre');
    localStorage.removeItem('id_rol');
    localStorage.removeItem('apellido_p');
    localStorage.removeItem('apellido_m');
  }
}
