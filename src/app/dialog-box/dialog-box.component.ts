import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDataService } from '../user-data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface DialogData {
  friendName: string;
  friendContact: string;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  newContactSchema: {
    contact: "1234",
    friendName:
    '',
    friendContact: ""
  };


  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public userService: UserDataService, private router: Router, public http: HttpClient) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick() {
    this.http.post('http://192.168.43.94:3000/friendAdded', {
      contact: this.userService.contactno,
      friendName: this.data.friendName,
      friendContact: this.data.friendContact
    }).subscribe((data) => {
      this.router.navigate(['/home']);
    })
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
