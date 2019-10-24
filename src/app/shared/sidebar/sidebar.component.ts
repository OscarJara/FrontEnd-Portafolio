import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/home', title: 'Home',  icon: 'dashboard', class: '' },
    { path: '/procesos', title: 'Procesos',  icon:'person', class: '' },
    { path: '/usuarios', title: 'Usuarios',  icon:'content_paste', class: '' },
    { path: '/roles', title: 'Roles',  icon:'library_books', class: '' },
    { path: '/empresas', title: 'Empresas',  icon:'bubble_chart', class: '' },
    { path: '/home', title: 'Indicadores',  icon:'location_on', class: '' },
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    id_rol = localStorage.getItem('id_rol');
    id=0;
    constructor() { }

    ngOnInit() {
        //TODO: Modificar onInit para llamada a servicio encargado de traer listado menú correspondiente al usuario
        console.log(this.id_rol);
        
        ROUTES.forEach(element => {
            if (element.path=='/empresas'){
                if (this.id_rol!='0'){

                   ROUTES.splice(this.id,1);
                }
            }
            this.id+=1
        });
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

}
