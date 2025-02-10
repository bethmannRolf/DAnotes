import { inject, Injectable } from '@angular/core';
import { Note } from './interfaces/note.interface';
import { Firestore, collection, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServicesService {


  trashNotes: Note[] = [];
  normalNotes: Note[] = [];
  firestore: Firestore = inject(Firestore)




  constructor() { }


  getnotesRef(){
    return collection(this.firestore, 'notes')
  }
  



getTrashRef(){
  return collection(this.firestore, 'trash')
}

getSingleDocRef(collId:string, docId:string){
return doc(collection(this.firestore, collId), docId)
}


}
