import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { ProcesosComponent } from './components/procesos/procesos.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { ModalsComponent } from './components/modals/modals.component';
import { RolesComponent } from './components/roles/roles.component';
import { ProcesoComponent } from './components/proceso/proceso.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { ArbolComponent } from './components/arbol/arbol.component';
import { MantenedorComponent } from './components/mantenedor/mantenedor.component';
import { IndicadoresComponent } from './components/indicadores/indicadores.component';


const routes: Routes = [

  { path: 'recovery', component: RecoveryPasswordComponent },
  { path: 'mantenedor', component: MantenedorComponent},
  { path:'test', component:ArbolComponent},
  { path: 'new-password/:token', component:NewPasswordComponent},
  { path: 'empresas', component:EmpresasComponent,canActivate: [AuthGuard]},
  { path: 'modals', component:ModalsComponent,canActivate: [AuthGuard]},
  { path: 'roles', component:RolesComponent,canActivate: [AuthGuard]},
  { path: 'login'   , component: LoginComponent },
  { path: 'home'    , component: HomeComponent,canActivate: [AuthGuard] },
  { path: 'procesos'    , component: ProcesosComponent,canActivate: [AuthGuard] },
  { path: 'proceso/:id' , component:ProcesoComponent,canActivate: [AuthGuard]},
  { path: 'usuarios'    , component: UsuariosComponent,canActivate: [AuthGuard] },
  { path: 'roles'    , component: RolesComponent,canActivate: [AuthGuard] },
  { path: 'empresas'    , component: EmpresasComponent,canActivate: [AuthGuard] },
  { path: 'indicadores'    , component: IndicadoresComponent,canActivate: [AuthGuard] },
  { path: '404'    , component: NotfoundComponent,canActivate: [AuthGuard] },
  { path: '**', redirectTo: '404' , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
