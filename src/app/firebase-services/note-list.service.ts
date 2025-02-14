import { inject, Injectable } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import {query, orderBy, where, limit, Firestore, collection, doc, collectionData, onSnapshot, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];
  normalMarkedNotes: Note[] = [];



  unsubTrash;
  unsubNotes;
  unsubMarkedNotes;



  firestore = inject(Firestore);

  constructor() {

    this.unsubTrash = this.subTrashList()
    this.unsubMarkedNotes = this.subMarkedNotesList()
    this.unsubNotes = this.subNotesList()
  }

async deleteNote(collId: 'notes' | 'trash', docId: string){

await deleteDoc( this.getSingleDocRef(collId, docId)).catch(
  (err)=>{console.log(err)}
)

}
  async updateNote(note: Note) {
 
    if (note.id) {
      let docRef = this.getSingleDocRef(this.getColIdFromNote(note), note.id)
      await updateDoc(docRef, this.getCleanJson(note)).catch(
        (err) => { console.log(err) }
      );
    }
  }

getCleanJson(note:Note):{} {

return {
  type: note.type,
  title:note.title,
  content:note.content, 
  marked: note.marked,
}
}

  getColIdFromNote(note: Note) {
    if (note.type == 'note') {
      return 'notes'
    }
    else {
      return 'trash'
    }
  }

  async addNote(item: Note, collId: "notes" | "trash" = "notes") {
    try {
      const collectionRef = collId === "notes" 
        ? this.getNotesRef() 
        : collection(this.firestore, "trash");
  
      const docRef = await addDoc(collectionRef, item);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }
  
  ngonDestroy() {
    this.unsubTrash();
    this.unsubNotes();
    this.unsubMarkedNotes();

  }

  subTrashList() {
    return onSnapshot(this.getTrashRef(), (list) => {
      this.trashNotes = []
      list.forEach(element => {
        this.trashNotes.push(this.setNoteObject(element.data(), element.id))
      })
    });
  }

  subNotesList() {
    const q = query(this.getNotesRef() ,  limit(100));

    return onSnapshot(q, (list) => {
      this.normalNotes = []
      list.forEach(element => {
        this.normalNotes.push(this.setNoteObject(element.data(), element.id))
      })
    });
  }

  subMarkedNotesList() {
    const q = query(this.getNotesRef(), where("marked", "==", true) ,  limit(100));

    return onSnapshot(q, (list) => {
      this.normalMarkedNotes = []
      list.forEach(element => {
        this.normalMarkedNotes.push(this.setNoteObject(element.data(), element.id))
      })
    });
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

  getNotesRef() {
    return collection(this.firestore, 'notes')
  }

  getTrashRef() {
    return collection(this.firestore, 'trash')
  }

  getSingleDocRef(collId: string, docId: string) {
    return doc(collection(this.firestore, collId), docId)
  }
}
