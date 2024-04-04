import React, { useState, useEffect, useContext, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [showAlert, setShowAlert] = useState(false);
  let navigate = useNavigate();
  let name = localStorage.getItem("userName");
  useEffect(() => {
    console.log("USEEFFECT");
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate( "/login" );
    }
    
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef();
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title || "", // Provide default value if title is undefined
      edescription: currentNote.description || "", // Provide default value if description is undefined
      etag: currentNote.tag || "", // Provide default value if tag is undefined
    });
    // console.log("currentnote" + currentNote._id);
  };

  const handleClick = async (e) => {
    console.log("Updating the note" + note.id);
    e.preventDefault();
    setShowAlert(true);
    await editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    // setTimeout(() => {
    //   setShowAlert(false);
    // }, 3000);
  };

  const onChange = (e) => {
    console.log("Onchange");
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {showAlert && <Alert message="Note updated successfully!" />}

      <AddNote username={name}/>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        heheh
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
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Your Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-4">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Update Note's Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">
                    Update Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Update Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                type="button"
                onClick={handleClick}
                className="btn btn-primary"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* {showAlert && <Alert message="Note updated successfully!" />} */}

      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.map((note, index) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
