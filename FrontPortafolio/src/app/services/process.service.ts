import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleModel } from '../models/role.model';
import { ProcessModel } from '../models/process.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  URL_API:string = 'https://control-task.herokuapp.com';

  constructor(
      private http: HttpClient
  ) { }


  GetProcess(empresa:string,limit:number,offset:number){
    return this.http.get(`${this.URL_API}/process?id=${empresa}&li=${limit}&ff=${offset}`);
  }
  
  UpdateProcess(process:ProcessModel){
    return this.http.put(`${this.URL_API}/process`,process);
  }

  CreateProcess(process:ProcessModel){
    return this.http.post(`${this.URL_API}/process`,process);
  }

  DeleteProcess(empresa:string,id:ProcessModel){
    const params = {
      id:id,
      empresa:empresa
    }
    return this.http.post(`${this.URL_API}/de-process`,params);
  }
}
