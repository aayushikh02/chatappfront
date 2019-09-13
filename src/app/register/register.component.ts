import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
user={
  name:"",
  password:"",
  contact:"",
  friends:[]
};
  constructor(public http:HttpClient, private router: Router,public userService:UserDataService,private cookieService: CookieService ) { }

  registerUser(){
    this.http.post('http://192.168.43.94:3000/userSignUp',this.user).subscribe((data)=>{
        this.cookieService.set('UserName',this.user.name);
        this.cookieService.set( 'UserContactNo',this.user.contact);
        this.userService.username=this.user.name;
        this.userService.contactno=this.user.contact;
        this.router.navigate(['/noContactScreen']) ;
    })
  }

  ngOnInit() {
  }

}
