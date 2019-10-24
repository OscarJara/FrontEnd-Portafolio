import { Component, OnInit, Renderer2 } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css'],


})
export class ModalsComponent implements OnInit {

  data = {
    name:'Oscar',
    description:'TONTOCTM'
  }
  headers:any = [
    'a','b','c','h'
  ]
  users:any = [
    ['Oscar','Jara','Diaz',"<button class='btn btn-outline-danger' id='delete-button' (click)='DeleteUser(user.id)'></button>"],
    ['Victor','Cespedes','Loyola',"<button class='btn btn-outline-danger' id='delete-button' (click)='DeleteUser(user.id)'></button>"],
    ['Tanya','Tapia','Caceres',"<button class='btn btn-outline-danger' id='delete-button'(click)='DeleteUser(user.id)'></button>"],
  ]

  constructor(  ) { 
  }

          
  ngOnInit() {
  }
 
  DeleteUser(){
    console.log('DELETE');
  }
  
}


