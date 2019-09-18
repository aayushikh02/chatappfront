import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { UserDataService } from '../user-data.service';
import { HttpClient } from '@angular/common/http';
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
  message = "";
  show = false;
  friendList;
  k = { rr: '' };
  roomContact;
  typing = false;
  countLength;

  constructor(public userService: UserDataService, public http: HttpClient, public dialog: MatDialog, private cookieService: CookieService) {
  }

  // getCount(event) {
  //   this.countLength = document.getElementById("message").value.length; //length of message in inbox
  //   if (this.countLength > 0) {
  //     this.socket.emit('typing', this.userService.contactno);
  //     this.socket.on('showtyping', function (data) {
  //       document.getElementById('messageTyping').innerHTML = "";
  //       document.getElementById('messageTyping').innerHTML += '<p><em>' + data + "is typing.." + '</em></p>'
  //     })
  //   } else {
  //     this.socket.emit('Stoptyping', this.userService.contactno);
  //     this.socket.on('hidetyping', function (data) {
  //       document.getElementById('messageTyping').innerHTML = "";
  //     })
  //   }
  // }

//create a room
  roomEvent(roomcontact) {  
    document.getElementById('message-container').innerHTML = "";
    this.roomContact = roomcontact;
    this.socket.emit('addToRoom', { friendRoom: roomcontact, yourRoom: this.userService.contactno });
  }

  //send message
  sendMessage() {
    this.socket.removeAllListeners();
    var msg = this.message;
    document.getElementById('messageTyping').innerHTML = "";
    this.message = ""
    if (msg) {
      this.socket.emit('msg', { message: msg, user: this.userService.contactno, username: this.userService.username });
    }

    this.socket.on('newmsg', function (data) {
      if (data.user) {
        document.getElementById('message-container').innerHTML += '<div style="text-align:right"><b>' +
          data.username + '</b>: ' + data.message + '</div>'
      }
    })
  }

  //dialog box open
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '350px',
      data: { name: this.friendName, contact: this.friendContact }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFriendList();
    });
  }

  //get list of friends
  getFriendList() {
    this.k.rr = this.cookieService.get('UserContactNo');
    this.userService.contactno = this.cookieService.get('UserContactNo');
    this.userService.username = this.cookieService.get('UserName');
    this.http.post('http://192.168.43.94:3000/getfriends', this.k).subscribe((dataD) => {
      this.friendList = dataD['friends'];
      document.getElementById('message-container').innerHTML =
        '<div style="color:blue;text-align:center;font-size:30px;"><b>' +
        "Select any of your friend and sart chatting" + '</b></div>';
    });

  }

  public ngOnInit() {
    this.socket = io.connect("http://192.168.43.94:3000");  //connection
    this.socket.on("connect", function () {
    });
    this.getFriendList();
  }
}