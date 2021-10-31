import React, { useContext, useEffect, useState } from 'react';
import NoteContext from '../reactContext/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNewNode from './AddNewNode';
import NoteForm from './NoteForm';
import { Modal, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';



export default function MyNotes() {
    const context = useContext(NoteContext);
    const { getNotes, notes } = context; 
    const history = useHistory();
    const [show, setShow ] = useState(false);
    const handleClose = () => setShow(false);


    useEffect(() => {

        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            history.push("/login");
        }
        // eslint-disable-next-line
    }, [])
   

    try {
        return (
            <>
                <Modal show={ show } onHide={handleClose} >
                    <Modal.Header closeButton style={{ backgroundColor: "#330033", color: "#c56dc5" }}>
                        <Modal.Title>Edit a Note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: "#330033", color: "#c56dc5" }}>
                        <NoteForm setShow={setShow}/>
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: "#330033", color: "#c56dc5" }}>
                        <Button variant="dark" onClick={handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
                
                <AddNewNode />

                <h2 className="my-4">Your Notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                <div className="row">
                    {notes.note.map(note => {
                        return (<NoteItem key={note._id} note={note} setShow={setShow} />)
                    })}

                </div>

            </>
        )
    }
    catch (error) {
        return (
            <>
                <AddNewNode />
                <h1 className="d-flex justify-content-center "> Something went wrong !!</h1>
            </>
        )
    }
}
