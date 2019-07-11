import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-no-contact-screen',
  templateUrl: './no-contact-screen.component.html',
  styleUrls: ['./no-contact-screen.component.scss']
})
export class NoContactScreenComponent implements OnInit {
    contact: string;
    name: string;
  
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '350px',
      data: {name: this.name, contact: this.contact}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.contact = result;
    });
  }


  ngOnInit() {
  }

}
