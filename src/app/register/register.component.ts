import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
user={
  password:"",
  contact:"",
};
  constructor(public http:HttpClient, private router: Router) { }

  registerUser(){
    console.log("i m here")
    this.http.post('http://localhost:3000/userSignUp',this.user).subscribe((data)=>{
        console.log(data);
        this.router.navigate(['/noContactScreen']) ;
    })
  }

  ngOnInit() {
  }

}
