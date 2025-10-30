import { CommonModule } from '@angular/common';
import { Component ,Input} from '@angular/core';

@Component({
  selector: 'app-player',
  imports: [CommonModule],
  templateUrl: './player.html',
  styleUrl: './player.scss',
})
export class Player {
  @Input() name!:string;
}
