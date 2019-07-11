import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
  constructor(public http:HttpClient) { }

  loginUser(){
    this.http.post('http://localhost:3000/userLogin',this.user).subscribe((data)=>{
        console.log(data);
        if (data==true)
        {
       console.log("true");
        }
    })
  }

  ngOnInit() {
  }

}
