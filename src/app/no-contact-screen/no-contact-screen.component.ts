import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-no-contact-screen',
  templateUrl: './no-contact-screen.component.html',
  styleUrls: ['./no-contact-screen.component.scss']
})
export class NoContactScreenComponent implements OnInit {
    friendContact: string;
    friendName: string;
  
  constructor(public dialog: MatDialog,public userService:UserDataService) { }

  openDialog(): void {  //dialog box
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '350px',
      data: {name: this.friendName, contact: this.friendContact}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }


  ngOnInit() {
    console.log(this.userService.contactno);
    console.log(this.userService.username);
  }

}
