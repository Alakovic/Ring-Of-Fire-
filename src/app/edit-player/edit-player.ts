import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogRef,MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  imports: [CommonModule, FormsModule,MatDialogModule,MatButtonModule],
  templateUrl: './edit-player.html',
  styleUrls: ['./edit-player.scss'],
})
export class EditPlayer {
  allProfilePictures = ['man.png', 'woman.png'];

  constructor(public dialogRef: MatDialogRef<EditPlayer>) {}
}
