import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = (props) => {
  const context = useContext(noteContext);
  const {addNote} = context;

  const [note, setNote] = useState({title: "", description: "", tag: ""})

const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""})
    props.showAlert("Note Added Successfuly!", "success")
}
  const onChange = (e) =>{
  setNote({...note, [e.target.name]: e.target.value }) /* Here we using the spread operator which does that 
                                                       the properties of ...note is remained there only and the 
                                                       properties we code after thescreencast ...note will newly insert 
                                                       or overwrite them. */
  }


  return (
    <div className="container">
        <h1>Add Notes</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text"  className="form-control"  id="title"  name="title" value={note.title} onChange={onChange} minLength={1} required aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label"> Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label"> Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={0} required />
          </div>
          <button disabled={note.title.length<1 || note.description.length<5 } type="submit" onClick={handleClick} className="btn btn-primary">Add Note</button>
        </form>
    </div>
  )
}

export default Addnote