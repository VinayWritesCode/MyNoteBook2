import React, { useContext, useState } from 'react';
import NoteContext from '../reactContext/notes/NoteContext';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';

export default function NoteItem(props) {
    const context = useContext(NoteContext);
    const { editNote, editId } = context;
    const [currentNote, setCurrentNote] = useState({ id: editId, etitle: "", edescription: "", etag: "No Tag", edate: "" });
    const { setShow } = props;

    const handleAddClick = (e) => {
        e.preventDefault();
        editNote(editId , currentNote.etitle, currentNote.edescription, currentNote.etag, currentNote.edate);
        setShow(false);
    }

    const onChange = (e) => {
        // value store used in note object must be there ,And Add or overwrite Property in [] 
        setCurrentNote({ ...currentNote, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div>
                
                        <Form>
                            <Form.Group className="mb-3" controlId="etitle">
                                <Form.Label >Title </Form.Label>
                                <Form.Control type="text" placeholder="Enter your title" className="bg-dark text-white" name="etitle" onChange={onChange} />
                                <Form.Text className="text-muted">
                                    Title must be atleast 3 character .
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="edescription">
                                <Form.Label>Description</Form.Label>
                                <InputGroup>
                                    <FormControl as="textarea" className="bg-dark text-white " placeholder="Enter your description" name="edescription" onChange={onChange} />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="etag">
                                <Form.Label>Tag</Form.Label>
                                <Form.Select aria-label="Select your Tag" className="bg-dark text-white w-50" name="etag" onChange={onChange}>

                                    <option>None</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Meeting">Meeting</option>
                                    <option value="Study">Study</option>
                                    <option value="Gym">Gym</option>

                                </Form.Select>
                            </Form.Group>

                            <div className="col-md-4 mb-3">

                                <Form.Group controlId="edate" >

                                    <Form.Label>Select Date</Form.Label>

                                    <Form.Control type="date" name="edate" placeholder="Date of Birth" className="bg-dark text-white" onChange={onChange} />

                                </Form.Group>

                            </div>

                            <Button variant="dark" type="submit" onClick={handleAddClick}>
                                <div className="text-primary "> ADD </div>
                            </Button>
                        </Form>
                    
            </div>
        </>
    )
}
