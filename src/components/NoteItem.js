import React, {useContext} from "react";
import NoteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote} = context;
  const { note , updateNote} = props;
  return (
        <div className="col-md-3">
          <div className="card my-3">
            <div className="card-body">
              <h5 className="card-title">{note.title}</h5>
              <p className="card-text">{note.description}</p>
              <p className="card-text">Tag: "{note.tag}" </p>
              <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);
                props.showAlert("Note Successfuly Deleted", "success")
              }}></i>
              <i className="fa-solid fa-pen-to-square mx-2 " onClick={()=>{updateNote(note)
              }}> </i>
            </div>
          </div>
        </div>
  );
};

export default NoteItem;
