import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { GameModel } from './../../models/game';
import { Player } from '../player/player';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayer } from '../dialog-add-player/dialog-add-player';
import { GameInfo } from '../game-info/game-info';
import { GameService } from '../firebase-service/game-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, Player, MatIconModule, MatButtonModule, MatDialogModule, GameInfo],
  templateUrl: './game.html',
  styleUrls: ['./game.scss'],
})
export class Game {
  cards: number[] = [0, 1, 2, 3];
  pickCardAnimation: boolean = false;
  currentCard: string = '';
  game?: GameModel;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    public dialog: MatDialog,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const gameId = params['id'];
      console.log('Game ID:', gameId);

      this.gameService.getGameById(gameId).subscribe((gameData: any) => {
        this.updateGameFromData(gameData);
         console.log('Game update', gameData);
      });
    });
  }

  private updateGameFromData(gameData: any) {
    if (!this.game) {
      this.game = new GameModel();
    }

    this.game.currentPlayer = gameData.currentPlayer;
    this.game.playedCards = gameData.playedCards;
    this.game.players = gameData.players;
    // this.game.player_images = gameData.player_images;
    this.game.stack = gameData.stack;
    // this.game.pickCardAnimation = gameData.pickCardAnimation;
    // this.game.currentCard = gameData.currentCard;
  }

  newGame() {
    this.game = new GameModel();
    this.gameService.addGame(this.game);
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

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game?.players.push(name);
      }
    });
  }
}
