import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mantenedor',
  templateUrl: './mantenedor.component.html',
  styleUrls: ['./mantenedor.component.css']
})
export class MantenedorComponent implements OnInit {

  constructor() { }
  id_rol = localStorage.getItem('id_rol');
  ngOnInit() {
  }

}
