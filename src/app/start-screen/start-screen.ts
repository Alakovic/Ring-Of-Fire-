import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../firebase-service/game-service';
import { GameModel } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone:true,
  imports: [],
  templateUrl: './start-screen.html',
  styleUrl: './start-screen.scss',
})

export class StartScreen {
  router = inject(Router);
  gameService = inject(GameService);
  
 async newGame() {
    let game = new GameModel();
    try {
      const id = await this.gameService.addGame(game);
      console.log("Created new game with id:", id);
      this.router.navigate(['/game',id]);
    } catch (error) {
      console.error("Error creating game:",error);
      
    }
  }
}
