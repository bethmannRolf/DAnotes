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



  items$;
  items;
  firestore = inject(Firestore);

  constructor() {

    this.unsubList = onSnapshot(this.getnotesRef(), (list) => {
      list.forEach(element => {
        console.log( this.setNoteObject (element.data() , element.id))
      })
    });


    // this.unsubList();

    this.items$ = collectionData(this.getnotesRef());
    this.items = this.items$.subscribe((list) => {
      list.forEach(element => {
        console.log('2', element)
      })
    })



  }


  ngonDestroy() {
    this.items.unsubscribe()
  }


  setNoteObject(obj: any, id: string): Note {
    return {
      id: id || "",
      type: obj.type || "note",
      title: obj.title || "",
      content: obj.content || "",
      marked: obj.marked || false,
    }
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
