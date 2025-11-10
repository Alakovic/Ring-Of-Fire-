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
import { PlayerMobile } from '../player-mobile/player-mobile';
import { EditPlayer } from '../edit-player/edit-player';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    Player,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    GameInfo,
    PlayerMobile,
  ],
  templateUrl: './game.html',
  styleUrls: ['./game.scss'],
})
export class Game {
  cards: number[] = [0, 1, 2, 3];
  game?: GameModel;
  gameId: string = '';
  gameOver:boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      console.log('Game ID:', this.gameId);

      this.gameService.getGameById(this.gameId).subscribe((gameData: any) => {
        this.updateGameFromData(gameData);
        console.log('Game update', gameData);
      });
    });
  }

  private updateGameFromData(gameData: any) {
    if (!this.game) {
      this.game = new GameModel();
    }

    this.game.currentPlayer = gameData.currentPlayer ?? 0;
    this.game.playedCards = gameData.playedCards;
    this.game.players = gameData.players;
    this.game.player_images = gameData.player_images;
    this.game.stack = gameData.stack;
    this.game.pickCardAnimation = gameData.pickCardAnimation;
    this.game.currentCard = gameData.currentCard;
  }

  newGame() {
    this.game = new GameModel();
  }

  takeCard() {
    if(this.game?.stack.length == 0) {
      this.gameOver = true;
    }else  if (this.game && !this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop() || '';
      this.game.pickCardAnimation = true;
      if (this.game.players.length > 0) {
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      }
      this.saveGame();
      setTimeout(() => {
        this.game!.playedCards.push(this.game!.currentCard);
        this.game!.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  editPlayer(playerId: number) {
    console.log('Edit Player', playerId);
    const dialogRef = this.dialog.open(EditPlayer);
    dialogRef.afterClosed().subscribe((change: string) => {
       console.log('Received change', change);
      if (this.game && change) {
        if(change == 'DELETE'){
          this.game.players.splice(playerId,1);
          this.game.player_images.splice(playerId,1);
        }else {
           this.game.player_images[playerId] = change;
        }
       
        this.game.player_images[playerId] = change;
        this.saveGame();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayer);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0 && this.game) {
        this.game.players.push(name);
        this.game.player_images.push('man.png');
        this.saveGame();
      }
    });
  }

  saveGame() {
    if (this.game && this.gameId) {
      this.gameService
        .saveGame(this.gameId, this.game)
        .then(() => console.log('Game saved successfully!'))
        .catch((err) => console.error('Error saving game:', err));
    }
  }
}
