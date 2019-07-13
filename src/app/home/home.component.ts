import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../bootstrap.css']
})
export class HomeComponent implements OnInit {

  user;
  socket: any;
  message="";
  mesg:any;
  usr:any;
  show=false;

  constructor(public userService:UserDataService){
    
  }

 sendMessage() {
  this.socket.removeAllListeners();
  var msg =this.message;
  this.message=""
  if(msg) {
     this.socket.emit('msg', {message: msg, user:this.userService.username});
    console.log("yaha tou hu mai");
  }

  this.socket.on('newmsg', function(data) {
    console.log("hah bhi");
    if(data.user) {
       document.getElementById('message-container').innerHTML += '<div><b>' + 
          data.user + '</b>: ' + data.message + '</div>'
    } 
 })
}


  public ngOnInit() {
    
    this.socket=io.connect("http://192.168.43.94:3000");
    this.socket.on("connect", function() {
      // Do stuff when we connect to the server
  }); 
  // console.log(this.userService.branch);
    // this.socket.emit('addToRoom',this.userService.branch);
    console.log(this.userService.username);
  this.socket.emit("now","hi hello how are you");
  this.socket.on("some event", function(data) {
// Log the data I received
      console.log(data);
// Send a message to the server
   this.socket.emit("other event", {some: "data"});
});
  }
}
