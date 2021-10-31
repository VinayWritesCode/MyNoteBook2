import React,{ useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import NoteContext from '../reactContext/notes/NoteContext';


function AlertCom() {
    const context = useContext(NoteContext);
    const { alert } = context;
    
    return (
        <div>
            {alert ?
             <Alert key={1} variant={alert.type}>
                {alert.msg}
            </Alert> : "" }
        </div> 
        
    )
}

export default AlertCom
