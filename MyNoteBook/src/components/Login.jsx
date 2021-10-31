import React, { useContext, useState } from 'react';
import NoteContext from '../reactContext/notes/NoteContext';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Login() {
    const [credential, setCredential] = useState({ email: "", password: ""});
    let history = useHistory();
    const context = useContext(NoteContext);
    const { showAlert } = context;

    const handleSubmit = async (e) => {
        e.preventDefault();
         const host = "http://localhost:5000/";  // todo .env variable during deployment
         const response = await fetch(`${host}api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        })

        const json = await response.json();
        console.log(json);
        if(json.success){
            //Storing auth token and redirect
            localStorage.setItem('token', json.Authtoken);
            history.push("/");
            showAlert("Login Successfully . Welcome, Enjoy your free cloud storage for your notes", "success")
        }
        else{
            showAlert("Invalid Email or Password !!", "danger"); 
        }
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div className="container" style={{ color: "#fff", height: "70.1vh" }}>
            <h2 className="mt-4" style={{ color: "#fff", textAlign: "center" }}>  Login into your Account </h2>
            <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={onChange} placeholder="Enter email" name="email" value={credential.email} required/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={onChange} name="password" value={credential.password} placeholder="Password" minLength={5} required/>
                </Form.Group>
                <div className="mt-4 text-center " style={{marginLeft: "-2rem"}}>
                <Button variant="primary" type="submit">
                    Login
                </Button>
                </div>
            </Form>
        </div>
    )
}

export default Login
