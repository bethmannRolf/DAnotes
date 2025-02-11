import { inject, Injectable } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { Firestore, collection, doc, collectionData, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];



  unsubList;



  // items$;
  firestore = inject(Firestore);

  constructor() {

    this.unsubList = onSnapshot(this.getnotesRef(), (list) => {
      list.forEach(element => {
        console.log(element)
      })
    });


    this.unsubList();






    // this.items$ = collectionData(this.getnotesRef());

  }


  getnotesRef() {
    return collection(this.firestore, 'notes')
  }

  getTrashRef() {
    return collection(this.firestore, 'trash')
  }

  getSingleDocRef(collId: string, docId: string) {
    return doc(collection(this.firestore, collId), docId)
  }


}
