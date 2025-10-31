import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameModel } from './../../models/game';
import { Player } from '../player/player';
import {  MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayer } from '../dialog-add-player/dialog-add-player';
import { GameInfo } from '../game-info/game-info';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,Player,MatIconModule,MatButtonModule,MatDialogModule,GameInfo],
  templateUrl: './game.html',
  styleUrls: ['./game.scss'],
})

export class Game {
  cards: number[] = [0, 1, 2, 3];
  pickCardAnimation: boolean = false;
  currentCard: string = '';
  game?: GameModel;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new GameModel();
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game?.stack.pop() || '';
      this.pickCardAnimation = true;
    
      if (this.game) {
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      }
      setTimeout(() => {
        this.game?.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }
  
    openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayer);

    dialogRef.afterClosed().subscribe((name:string) => {
      if(name && name.length > 0 ){
      this.game?.players.push(name);
      }
    });
  }

}
