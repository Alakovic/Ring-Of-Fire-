import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameModel } from './../../models/game';
import { Player } from '../player/player';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,Player],
  templateUrl: './game.html',
  styleUrls: ['./game.scss'],
})

export class Game {
  cards: number[] = [0, 1, 2, 3];
  pickCardAnimation: boolean = false;
  currentCard: string = '';
  game?: GameModel;

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new GameModel();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game?.stack.pop() || '';
      this.pickCardAnimation = true;
    
      setTimeout(() => {
        this.game?.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }
}
