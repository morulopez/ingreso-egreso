import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DeshboardComponent } from './deshboard/deshboard.component';
import { dasboardRouter } from './deshboard/dashboard.routes';
import { AuthguardService } from './auth/authguard.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', component: DeshboardComponent,
    children: dasboardRouter,
    canActivate: [AuthguardService]},
  { path: '**', redirectTo: ''}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
