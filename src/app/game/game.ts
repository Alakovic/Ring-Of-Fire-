import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-game',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './game.html',
  styleUrls: ['./game.scss'],
})

export class Game {
  cards:number[] = [0,1,2,3];
  pickCardAnimation:boolean = false;

  takeCard(){
    this.pickCardAnimation = true;
  }
}
