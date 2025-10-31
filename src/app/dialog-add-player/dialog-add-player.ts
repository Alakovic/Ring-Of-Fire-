import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-add-player',
  standalone:true,
  imports: [CommonModule,MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule,MatDialogModule],
  templateUrl: './dialog-add-player.html',
  styleUrls:[ './dialog-add-player.scss',]
})
export class DialogAddPlayer {
  name:string ='';

  constructor(public dialogRef: MatDialogRef<DialogAddPlayer>) {}

   onNoClick() {
    this.dialogRef.close();
  }


}
