import React, { useContext , useState} from 'react'
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import NoteContext from '../reactContext/notes/NoteContext';

function AddNewNode() {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({title: "", description: "",tag: "No Tag", date: ""});
    
    const handleAddClick = (e) =>{
        e.preventDefault();
          addNote(note.title, note.description, note.tag, note.date);
        console.log(note.title, note.description, note.tag, note.date)
    }

    const onChange = (e) => {
         // value store used in note object must be there ,And Add or overwrite Property in [] 
          setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <h1> Add a Note</h1>
            <Form>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label >Title </Form.Label>
                    <Form.Control type="text" placeholder="Enter your title" className="bg-dark text-white"  name="title" onChange={onChange} />
                    <Form.Text className="text-muted">
                        Title must be atleast 3 character .
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <InputGroup>
                        <FormControl as="textarea" className="bg-dark text-white " placeholder="Enter your description"  name="description" onChange={onChange} />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="tag">
                    <Form.Label>Tag</Form.Label>
                    <Form.Select aria-label="Select your Tag" className="bg-dark text-white w-50"  name="tag" onChange={onChange}>

                        <option>None</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Study">Study</option>
                        <option value="Gym">Gym</option>

                    </Form.Select>
                </Form.Group>

                <div className="col-md-4 mb-3">

                    <Form.Group controlId="date" >

                        <Form.Label>Select Date</Form.Label>

                        <Form.Control type="date"  name="date" placeholder="Date of Birth" className="bg-dark text-white" onChange={onChange} />

                    </Form.Group>

                </div>

                <Button variant="dark" type="submit" onClick={handleAddClick}>
                    <div className="text-primary "> ADD </div>
                </Button>
            </Form>
        </div>
    )
}

export default AddNewNode;
