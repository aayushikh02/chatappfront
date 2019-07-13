import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NoContactScreenComponent } from './no-contact-screen/no-contact-screen.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:"",pathMatch: 'full' ,redirectTo:'/login'},
  {path:'register',component:RegisterComponent},
  {path:'noContactScreen',component:NoContactScreenComponent},
  {path:'home',component:HomeComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
