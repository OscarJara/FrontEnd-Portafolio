import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL_API:string = 'https://control-task.herokuapp.com';

  constructor(
      private http: HttpClient
  ) { }


  DeleteUser(id_usuario:string){
    const params = {
      id:id_usuario
    };

    return this.http.post(`${this.URL_API}/delete-user`,params);
  }
  GetUsers(empresa:string,id:string){
    return this.http.get(`${this.URL_API}/user?id=${id}&e=${empresa}`);
  }

  GetRole(email:string){
    return this.http.get(`${this.URL_API}/roles?i=${email}`);
  }
  AddUser(user:UserModel,idRol:number,idUnidad:number,photo:any){
    const params = {
      email:user['form']['value']['email'],
      nombre:user['form']['value']['nombre'],
      apellido_p:user['form']['value']['appaterno'],
      apellido_m:user['form']['value']['apmaterno'],
      id_rol:idRol,
      id_unidad:idUnidad,
      imagen:photo,
      estado:true
    }

    return this.http.post(`${this.URL_API}/user`,params);
  }
  ActivateUser(id:number){
    const params ={
      id:id
    }
    
    return this.http.post(`${this.URL_API}/activate-user`,params);
  }
  ModifyUser(user:UserModel,idRol:number,idUnidad:number,photo:any,id:number){
    const params = {
      id:id,
      email:user['form']['value']['email'],
      nombre:user['form']['value']['nombre'],
      apellido_p:user['form']['value']['appaterno'],
      apellido_m:user['form']['value']['apmaterno'],
      id_rol:idRol,
      id_unidad:idUnidad,
      estado:true,
      imagen:photo
    }
    console.log('PARAMETROS');
    console.log(params);
    return this.http.put(`${this.URL_API}/user`,params);
  }
}
