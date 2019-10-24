import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EmpresaModel } from '../models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  URL_API:string = 'https://control-task.herokuapp.com';

  constructor(
      private http: HttpClient
  ) { }

  ModificarEmpresa(empresa:EmpresaModel){
    return this.http.put(`${this.URL_API}/company`,empresa);
  }
  CrearEmpresa(empresa:EmpresaModel){
    return this.http.post(`${this.URL_API}/company`,empresa);
  }
  GetEmpresa(){
    return this.http.get(`${this.URL_API}/company`);
  }
  BorrarEmpresa(id){
    const params = {
        id:id
    }
    return this.http.delete(`${this.URL_API}/company`,{params});

  }

  ActivarEmpresa(id){
    const params = {
        id:id
    }
    return this.http.post(`${this.URL_API}/activate-company`,params);

  }
}
