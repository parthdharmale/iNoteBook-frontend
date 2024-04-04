import React from "react";

import { useState } from "react";
import noteContext from "./noteContext";
// import axios from "axios";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  // const mongoose = require("mongoose");
  const [notes, setNotes] = useState(notesInitial);
  const authToken = localStorage.getItem("token");
  // Get All Notes
  const getNotes = async () => {
    // API Call

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmNDlmOGE2ZWNiMjMxMTNhZGQ1OGMwIn0sImlhdCI6MTcxMDcwMjM2OX0.S0lmxrdNGfXp2VtoyU9mbvOU23-fsM9L1Z7aM_9ZeHQ",
          authToken,
      },
    });

    const json = await response.json();

    console.log(json);
    setNotes(json);
  };

  //   Add a note
  const addNote = async (title, description, tag) => {
    // API Call
    // const newId = mongoose.Types.ObjectId();

    
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmNDlmOGE2ZWNiMjMxMTNhZGQ1OGMwIn0sImlhdCI6MTcxMDcwMjM2OX0.S0lmxrdNGfXp2VtoyU9mbvOU23-fsM9L1Z7aM_9ZeHQ",
        authToken,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    
    const json = await response.json();
    const note = {
      // _id: "65f815c065f4540d703bah94489",
      _id: json._id,
      // user: "65f49f8a6ecb23113add58c0",
      user: json.user,
      title: title,
      description: description,
      tag: tag,
      date: "2024-03-18T10:21:52.495Z",
      __v: 0,
    };
    console.log(json);
    setNotes(notes.concat(note));

    // const note = await response.json();
    // setNotes(notes.concat(note))
    // console.log("Adding a new note");
  };
  //   Delete a note

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmNDlmOGE2ZWNiMjMxMTNhZGQ1OGMwIn0sImlhdCI6MTcxMDcwMjM2OX0.S0lmxrdNGfXp2VtoyU9mbvOU23-fsM9L1Z7aM_9ZeHQ",
          authToken,
      },
    });
    console.log("Deleting note" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //   Edit a note

  const editNote = async (id, title, description, tag) => {
    // API Call
    console.log("Edit Note");
    console.log(id, "this is id");

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmNDlmOGE2ZWNiMjMxMTNhZGQ1OGMwIn0sImlhdCI6MTcxMDcwMjM2OX0.S0lmxrdNGfXp2VtoyU9mbvOU23-fsM9L1Z7aM_9ZeHQ",
          authToken,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    console.log("Updating");

    let newNotes = JSON.parse(JSON.stringify(notes));

    // The for loop iterates over the notes array and finds the note with given _id and changes its title,description and tag
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  //   const editNote = async (id, title, description, tag) => {
  //     // API Call
  //     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token":
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmNDlmOGE2ZWNiMjMxMTNhZGQ1OGMwIn0sImlhdCI6MTcxMDcwMjM2OX0.S0lmxrdNGfXp2VtoyU9mbvOU23-fsM9L1Z7aM_9ZeHQ",
  //       },
  //       body: JSON.stringify({ title, description, tag }),
  //     });
  //     const updatedNote = await response.json(); // Get the updated note from the response
  //     console.log("Updating");
  //     // Update the state with the updated note
  //     setNotes(
  //       notes.map((note) =>
  //         note._id === id
  //           ? {
  //               ...note,
  //               title: updatedNote.title,
  //               description: updatedNote.description,
  //               tag: updatedNote.tag,
  //             }
  //           : note
  //       )
  //     );
  //   };

  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
