import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { RoleModel } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  URL_API:string = 'https://control-task.herokuapp.com';

  constructor(
      private http: HttpClient
  ) { }


  GetRole(email:string){
    return this.http.get(`${this.URL_API}/roles?i=${email}`);
  }
  Activaterole(id){
    return this.http.get(`${this.URL_API}/activate-role?id=${id}`);
  }
  AddRole(role:RoleModel){
    return this.http.post(`${this.URL_API}/role`,role);
  }

  ModifyRole(role:RoleModel){
    return this.http.put(`${this.URL_API}/role`,role);
  }

  DeleteRole(id:number){
    const params = {
      id:id
    }

    return this.http.post(`${this.URL_API}/delete-role`,params);
  }

}
