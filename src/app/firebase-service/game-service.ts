import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore,addDoc, docData,doc,DocumentData,DocumentReference, updateDoc } from '@angular/fire/firestore';
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

  async addGame(game: GameModel): Promise<string> {
    try {
       const docRef: DocumentReference = await addDoc(this.getGameRef(),game.toJson());
       return docRef.id;
    } catch (error) {
        console.error("Error",error);
        throw error;
    }
  }

  getGameById(gameId:string): Observable<DocumentData | undefined> {
    const gameIdRef = doc(this.firestore,`games/${gameId}`);
    return docData(gameIdRef);
  }

  async saveGame(gameId:string,game:GameModel):Promise<void> {
    try {
      const gameRef = doc(this.firestore,`games/${gameId}`);
      await updateDoc(gameRef,game.toJson());
      console.log('Game updated successfully!');
      
    } catch (error) {
      console.error("Error:",error);
      
    }
  }
  
}

