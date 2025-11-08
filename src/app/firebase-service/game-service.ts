import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore,addDoc, docData,doc,DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GameModel } from '../../models/game';

@Injectable({ providedIn: 'root' })

export class GameService {
  firestore: Firestore = inject(Firestore);
  games$: Observable<any[]>;

  constructor() {
    this.games$ = collectionData(this.getGameRef());
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  async addGame(game: GameModel): Promise<void> {
    try {
        await addDoc(this.getGameRef(),game.toJson());
    } catch (error) {
        console.error("Error",error);
    }
  }

  getGameById(gameId:string): Observable<DocumentData | undefined> {
    const gameIdRef = doc(this.firestore,`games/${gameId}`);
    return docData(gameIdRef);
  }
}
