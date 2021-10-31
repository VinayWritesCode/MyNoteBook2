import React, { useContext } from 'react';
import NoteContext from '../reactContext/notes/NoteContext';
import { Card } from 'react-bootstrap';
import DeleteIcon  from '../Resources/Images/delete-button.png';
import EditIcon from '../Resources/Images/editIcon.png';



export default function NoteItem(props) {
    const context = useContext(NoteContext);
    const { deleteNote, changeKey} = context;
    const { note, setShow } = props;
    
    return (
        <>
        <div className="col"> 
            <Card className="text-center my-3 bg-dark d-flex" style={{ color: "#fff", width: "21rem"}}>
                <Card.Header>{ note.tag.toUpperCase() }</Card.Header>
                <Card.Body>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Text>
                       {note.description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer  style={{color: "red"}}> {note.date.slice(0,10)} <br/>
                    { note.date.slice(11,19) }
                     <div className="my-2">
                          <img src={DeleteIcon} alt="Delete button" onClick={()=>{ deleteNote(note._id)}} style={{width: "25px", height: "25px", margin: "0.50rem" , cursor: "pointer"}}/>
                            <img src={EditIcon} alt="Update button" onClick={() => {setShow(true)
                                changeKey(note._id)}} style={{ width: "25px", height: "25px", margin: "0.50rem", cursor: "pointer" }} />
                     </div>
                 </Card.Footer>

            </Card>

        </div>
        </>
    )
}
