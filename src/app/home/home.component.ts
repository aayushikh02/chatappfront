import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { UserDataService } from '../user-data.service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
  sockets: any;
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
  countLength;
  socketId;
  constructor(public userService:UserDataService,public http:HttpClient,public dialog: MatDialog,private cookieService: CookieService ){
    
  }

   getCount(event) {
     console.log(event);
    this.countLength = document.getElementById("message").value.length;
    console.log(this.countLength);
    if(this.countLength>0){
      console.log("greater");
      // this.sockets.in(this.roomContact).emit('typing',this.userService.contactno);
      this.socket.emit('typing',this.userService.contactno);
      this.socket.on('showtyping',function(data){
        console.log("i m in typing");
        document.getElementById('messageTyping').innerHTML="";
        document.getElementById('messageTyping').innerHTML+='<p><em>'+data+"is typing.."+'</em></p>'
      })
    }else{
      console.log("less");
      this.socket.emit('Stoptyping',this.userService.contactno);
      this.socket.on('hidetyping',function(data){
        console.log("i m hiding typing");
        document.getElementById('messageTyping').innerHTML="";
      })
    }
   
  }


  roomEvent(roomcontact){
    document.getElementById('message-container').innerHTML="";
    console.log(this.xx);
    console.log(roomcontact);
    this.roomContact=roomcontact;
    this.idMix=roomcontact+this.userService.contactno;
    console.log("id Mix....");
    console.log(this.idMix);
    // this.socket.emit('addToRoom',{idMix:this.idMix,contact:roomcontact});
    this.socket.emit('addToRoom',{friendRoom:roomcontact,yourRoom:this.userService.contactno});
    // this.socket.emit('addToRoom',this.roomContact);

    // this.socket.emit("now","hi hello how are you");
    // this.socket.on("some event", function(data) {
    //s Log the data I received
    // console.log(data);
    // Send a message to the server
    //  this.socket.emit("other event", {some: "data"});
  // });
  }

 sendMessage() {
  this.socket.removeAllListeners();
  console.log(this.userService.contactno);  
  var msg =this.message;
  document.getElementById('messageTyping').innerHTML="";
  this.message=""
  if(msg) {
     this.socket.emit('msg', {message: msg, user:this.userService.contactno,username:this.userService.username});
    console.log("yaha tou hu mai");
  }

  this.socket.on('newmsg', function(data) {
    console.log("hah bhi");
    // console.log(this.userService.username);
    if(data.user) {
       document.getElementById('message-container').innerHTML += '<div style="text-align:right"><b>' + 
       data.username + '</b>: ' + data.message + '</div>'
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
    this.socket=io.connect("http://192.168.43.94:3000");
    this.socket.on("connect", function() {
      console.log("user connected is --- ")
      console.log("see who is called");
      // this.socket.on("socketID",function(data){
      //   console.log(data);
      //   this.socketId=data;
      // });
      // Do stuff when we connect to the server
  }); 


    console.log("cookies---");
    console.log(this.cookieService.get('UserContactNo'));
    this.k.rr=this.cookieService.get('UserContactNo');
    this.userService.contactno=this.cookieService.get('UserContactNo');
    this.userService.username=this.cookieService.get('UserName');
    console.log(this.userService.username);
    console.log(this.k.rr);
    console.log("user name and number");
    // console.log(this.userService.contactno);
    // console.log(this.userService.username);
    // this.k={rr:this.userService.contactno};.then
  this.http.post('http://192.168.43.94:3000/getfriends',this.k).subscribe((dataD)=>{
      console.log("adaaatda");
      console.log(dataD);
      this.friendList=dataD['friends'];
      console.log(this.friendList);
      console.log(this.userService.userId);

      document.getElementById('message-container').innerHTML=
      '<div style="color:blue;text-align:center;font-size:30px;"><b>' + 
       "Select any of your friend and sart chatting" +'</b></div>';
      // var list = data;
      // this.friendList=list.friends;
      // console.log(this.friendList[0].friendName)
  });

 
  }
}