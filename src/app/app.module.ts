import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ProcesosComponent } from './components/procesos/procesos.component';
import { RolesComponent } from './components/roles/roles.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { IndicadoresComponent } from './components/indicadores/indicadores.component';
import { TarjetaProcesoComponent } from './components/tarjeta-proceso/tarjeta-proceso.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { ModalsComponent } from './components/modals/modals.component';
import { ProcesoComponent } from './components/proceso/proceso.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2Rut } from 'ng2-rut';
import { MatInputModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatButtonModule,
  MatTreeModule,
  MatIconModule,
  MatTabsModule
 } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ArbolComponent } from './components/arbol/arbol.component';
import { MantenedorComponent } from './components/mantenedor/mantenedor.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RecoveryPasswordComponent,
    NavbarComponent,
    UsuariosComponent,
    NotfoundComponent,
    SidebarComponent,
    ProcesosComponent,
    RolesComponent,
    EmpresasComponent,
    IndicadoresComponent,
    TarjetaProcesoComponent,
    NewPasswordComponent,
    ModalsComponent,
    ProcesoComponent,
    ArbolComponent,
    MantenedorComponent
  ],
  imports: [
    MatTabsModule,
    SimplebarAngularModule, 
    Ng2Rut, 
    MatIconModule,
    MatTreeModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
