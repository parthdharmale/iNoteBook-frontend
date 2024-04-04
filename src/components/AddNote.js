import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = ({username}) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();

    if (!note.title || !note.description) {
      window.alert("Please enter values for title and description");
    } else {
      addNote(note.title, note.description, note.tag);
      //   window.alert("Note Added Succesfully");
    }

    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  const onChange = (event) => {
    console.log(username);
    setNote({ ...note, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        {/* <h1> Hello {name}</h1> */}
        <h1>Add a Note</h1>
        <form className="my-4">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Your Note's Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
            />
          </div>

          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
