import React, { useContext} from "react";
import noteContext from "../context/notes/noteContext";
import Alert from "./Alert";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    // <div>
    //   <h5>{note.title}</h5>
    //   <p>{note.description}</p>
    // </div>
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="far fa-trash-alt mx-2"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
            {/* <i className="far fa-trash-alt mx-2" onClick={handleOnClick}></i> */}

            <i
              className="far fa-edit mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          {/* <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6> */}
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
