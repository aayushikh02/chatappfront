import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userInfoWrong=false;
  userNotExist=false;
  showErrorMessage;
  user={
  password:"",
  contact:"",
};
  constructor(public http:HttpClient,public userService:UserDataService, private router: Router,private cookieService: CookieService ) { }

  


  loginUser(){
    this.http.post('http://192.168.43.94:3000/userLogin',this.user).subscribe((response)=>{
  
        if(response['code']==200){
          
          this.cookieService.set('UserName',response['data']['name']);
          this.cookieService.set( 'UserContactNo', this.user.contact );
          this.userService.username=this.cookieService.get('UserName');
          this.userService.contactno=this.cookieService.get('UserContactNo');
          this.router.navigate(['/home']) ;
        }else if(response['code']==503){
          this.userInfoWrong =true;
          this.showErrorMessage='User Name or Password is wrong';
        }else{
          this.userNotExist=true;
          this.showErrorMessage='User Does not exist';
        }
    })
  }

  ngOnInit() {
  }

}
