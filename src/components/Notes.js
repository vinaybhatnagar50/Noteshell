import React, { useContext, useState, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  let Navigate = useNavigate()
  const { notes, getNotes, editNote} = context;
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
    getNotes();
  }
  else {
    Navigate('/login' , { replace: true })
  }
  }, [getNotes, Navigate]);
  
  
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})
  
  const updateNote = (currentNote) => {
    refClose.current.click();
    setNote({id : currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    ref.current.click();
    props.showAlert("Note Successfuly Updated", "success")
}

  const onChange = (e) =>{
  setNote({...note, [e.target.name]: e.target.value }) /* Here we using the spread operatotr which does that 
                                                       the roperties of ...note is remained there only and the 
                                                       properties enter further ...note will newly insert 
                                                       or overwrite them. */
  }


  return (
    <>
      <Addnote showAlert={props.showAlert}/>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                    aria-describedby="emailHelp" value={note.etitle} minLength={1} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    {" "}
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange} value={note.edescription} minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    {" "}
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange} value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal" 
              >
                Close
              </button>
              <button ref={refClose} type="button" className="btn btn-primary" onClick={handleClick} disabled={note.etitle.length<1 || note.edescription.length<5 } >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" container row my-3">
        <h1>Your Notes</h1> <div className="container ">
        {notes.length===0 && "No Notes to DIsplay"} </div>
        {Array.isArray(notes) && notes.map((note) => {
          return (
            <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
