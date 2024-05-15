import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState= (props)=>{
    const notesInitial = [
        {
          "_id": "6644a18c0993129d9a3baf6f",
          "user": "66431d65bc0c2ed6e10d3c27",
          "title": "This is my first note",
          "description": "Please wakeup early",
          "tag": "Its a reminder",
          "date": "2024-05-15T11:50:36.435Z",
          "__v": 0
        },
        {
          "_id": "6644a18c0993129d9a3baf6f",
          "user": "66431d65bc0c2ed6e10d3c27",
          "title": "This is my first note",
          "description": "Please wakeup early",
          "tag": "Its a reminder",
          "date": "2024-05-15T11:50:36.435Z",
          "__v": 0
        },
        {
          "_id": "6644a18c0993129d9a3baf6f",
          "user": "66431d65bc0c2ed6e10d3c27",
          "title": "This is my first note",
          "description": "Please wakeup early",
          "tag": "Its a reminder",
          "date": "2024-05-15T11:50:36.435Z",
          "__v": 0
        },
        {
          "_id": "6644a18c0993129d9a3baf6f",
          "user": "66431d65bc0c2ed6e10d3c27",
          "title": "This is my first note",
          "description": "Please wakeup early",
          "tag": "Its a reminder",
          "date": "2024-05-15T11:50:36.435Z",
          "__v": 0
        },
        {
          "_id": "6644a18c0993129d9a3baf6f",
          "user": "66431d65bc0c2ed6e10d3c27",
          "title": "This is my first note",
          "description": "Please wakeup early",
          "tag": "Its a reminder",
          "date": "2024-05-15T11:50:36.435Z",
          "__v": 0
        }

      ] 
    const [notes , setNotes]= useState(notesInitial)
    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;