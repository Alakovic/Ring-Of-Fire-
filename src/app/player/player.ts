import { CommonModule } from '@angular/common';
import { Component ,Input} from '@angular/core';

@Component({
  selector: 'app-player',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './player.html',
  styleUrl: './player.scss',
})
export class Player {
  @Input() name!:string;
  @Input() playerActive:boolean = false;
}
