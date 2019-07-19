import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
user={
  password:"",
  contact:"",
};
  constructor(public http:HttpClient,public userService:UserDataService, private router: Router) { }

  loginUser(){
    this.http.post('http://192.168.43.94:3000/userLogin',this.user).subscribe((data)=>{
        console.log(data);
        if(data){
    
          this.userService.contactno=this.user.contact;
          this.router.navigate(['/home']) ;
        }
    })
  }

  ngOnInit() {
  }

}
