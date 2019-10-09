import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgbModal, ModalDismissReasons,NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
import { NewPasswordComponent } from './components/new-password/new-password.component';

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
    NewPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
