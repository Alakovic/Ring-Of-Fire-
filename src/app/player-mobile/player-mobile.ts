import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  imports: [],
  templateUrl: './player-mobile.html',
  styleUrl: './player-mobile.scss',
})
export class PlayerMobile {
  @Input() name!: string;
  @Input() playerActive: boolean = false;
   @Input() image!:string;
}
