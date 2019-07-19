import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { UserDataService } from '../user-data.service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { Socket } from 'net';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../bootstrap.css'],
 
})
export class HomeComponent implements OnInit {
  friendContact: string;
  friendName: string;
  user;
  socket: any;
  message="";
  mesg:any;
  usr:any;
  show=false;
  friendList;
  k={rr:''};  
  roomContact;
  idMix;
  userId:any;
  xx;
  typing = false;
  constructor(public userService:UserDataService,public http:HttpClient,public dialog: MatDialog,){
    
  }

  onKeydown(event) {
    console.log(event);
    this.socket.emit('typing',this.userService.contactno);
    this.socket.on('typing',function(data){
      document.getElementById('messageTyping').innerHTML+='<p><em>'+data+"is typing.."+'</em></p>'
    })
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);
  }

  roomEvent(roomcontact){
    console.log(this.xx);
    console.log(roomcontact);
    this.roomContact=roomcontact;
    this.idMix=roomcontact+this.userService.contactno;
    console.log("id Mix....");
    console.log(this.idMix);
    this.socket.emit('addToRoom',this.idMix);
    // this.socket.emit('addToRoom',this.roomContact);
    console.log(this.userService.username);
    // this.socket.emit("now","hi hello how are you");
    // this.socket.on("some event", function(data) {
    // Log the data I received
    // console.log(data);
    // Send a message to the server
    //  this.socket.emit("other event", {some: "data"});
  // });
  }



 sendMessage() {
  this.socket.removeAllListeners();
  console.log(this.userService.contactno);
  var msg =this.message;
  this.message=""
  if(msg) {
     this.socket.emit('msg', {message: msg, user:this.userService.contactno});
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

openDialog(): void {
  const dialogRef = this.dialog.open(DialogBoxComponent, {
    width: '350px',
    data: {name: this.friendName, contact: this.friendContact}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
  });
}



  public ngOnInit()  {
    this.k.rr=this.userService.contactno;
    console.log(this.k.rr);
    console.log("user name and number");
    console.log(this.userService.contactno);
    console.log(this.userService.username);
    // this.k={rr:this.userService.contactno};.then
  this.http.post('http://192.168.43.94:3000/getfriends',this.k).subscribe((dataD)=>{
      console.log("adaaatda");
      console.log(dataD);
      this.friendList=dataD['friends'];
      console.log(this.friendList);
      console.log(this.userService.userId);
      // var list = data;
      // this.friendList=list.friends;
      // console.log(this.friendList[0].friendName)
  });

    this.socket=io.connect("http://192.168.43.94:3000");
    this.socket.on("connect", function() {
      // Do stuff when we connect to the server
  }); 
  // console.log(this.userService.branch);
 
  }
}