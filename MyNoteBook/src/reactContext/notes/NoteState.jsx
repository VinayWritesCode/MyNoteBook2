import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const [notes, setNotes] = useState([]);
    const [editId, setEditId ] = useState("");
    const [alert, setAlert] = useState(null);

    const changeKey = async (id) => {
        setEditId(id);
    }

    const showAlert = (msg, type) => {
        setAlert({
            msg: msg,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    }

    const getNotes = async () => {

        // Api call
        const response = await fetch(`${host}/api/notes/fetchAllNote`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json();
        setNotes(json);
        
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // Api call
        const response = await fetch(`${host}/api/notes/addNote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })

        console.log("New Note Added");
        const note = await response.json();
        if(note.success){
            showAlert("Successfully New Note Added","success");
        }
        else{
            showAlert("Something Went Wrong","danger");
        }
        //setNotes(note.concat(notes));
        getNotes();
    }
    
    // Delete a Note
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        
        const json = await response.json();
        console.log(json);
        // Logic delete a note todo 
        // const newNotes = notes.filter((note) => { return note._id !== id })
        // setNotes(newNotes);
        getNotes();
        if (json.success) {
            showAlert("Successfully Deleted","success");
        }
        else {
            showAlert("Something Went Wrong", "danger");
        }
        
    }
    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        
        // Api call
        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })

        const json = await response.json();
        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic Edit a note
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
        if (json.success) {
            showAlert("Successfully Updated", "success");
        }
        else {
            showAlert("Something Went Wrong","danger");
        }
        getNotes();
    }

    return (
        <NoteContext.Provider value={{ alert, showAlert, notes, addNote, deleteNote, editNote, getNotes, setEditId, editId, changeKey }} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;