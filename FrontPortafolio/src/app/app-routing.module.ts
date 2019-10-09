import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';


const routes: Routes = [

  { path: 'recovery', component: RecoveryPasswordComponent },
  { path:'new-password/:token', component:NewPasswordComponent},
  { path: 'login'   , component: LoginComponent },
  { path: 'home'    , component: HomeComponent,canActivate: [AuthGuard] },
  { path: 'usuarios'    , component: UsuariosComponent,canActivate: [AuthGuard] },
  { path: '404'    , component: NotfoundComponent,canActivate: [AuthGuard] },
  { path: '**', redirectTo: '404' , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
