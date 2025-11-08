import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../firebase-service/game-service';

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
  
  newGame() {
    this.router.navigate(['/game']);
  }
}
