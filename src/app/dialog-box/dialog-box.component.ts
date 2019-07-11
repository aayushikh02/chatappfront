import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  name: string;
  contact: string;
}


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


    onNoClick(): void {
      this.dialogRef.close();
    }
    onAddClick(){
      console.log(this.data.name);
      console.log(this.data.contact);
      console.log("addedd..");
      this.dialogRef.close();
    }

  ngOnInit() {
  }

}
