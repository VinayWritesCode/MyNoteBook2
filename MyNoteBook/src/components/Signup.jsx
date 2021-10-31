import React, { useContext, useState } from 'react';
import NoteContext from '../reactContext/notes/NoteContext';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Signup() {
    const [createUser,setCreateUser] = useState({name: "",email:"",password:"",cpassword:""});
    let history = useHistory();
    const context = useContext(NoteContext);
    const { showAlert } = context;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(createUser.password === createUser.cpassword){
            const host = "http://localhost:5000/";  // todo .env variable during deployment
            const response = await fetch(`${host}api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: createUser.name, email: createUser.email, password: createUser.password })

            })

            const json = await response.json();
            console.log(json);
            if (json.success) {
                //Storing auth token and redirect
                localStorage.setItem( 'token', json.Authtoken);
                history.push("/");
                showAlert("Account Created Successfully. Welcome, Enjoy your free cloud storage for your notes", "success");
            }
            else {
                showAlert("Account with this email is already exit !!", "danger");
            }
        }else{
            showAlert("Password not matched, try again !!", "warning");
        }
    }
    const onChange = (e) => {
        setCreateUser({ ...createUser, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <h2 className="mt-5" style={{color: "#fff", textAlign: "center" }}>  Create your Account </h2>
            <Form className="my-5 " onSubmit={handleSubmit} style={{ color: "#fff", height: "70.1vh" }}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Enter your name</Form.Label>
                    <Form.Control type="text" name="name" value={createUser.name} placeholder="Enter name" onChange={onChange} minLength={3} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" value={createUser.email}  placeholder="Enter email" onChange={onChange} required/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={createUser.password}  placeholder="Password" onChange={onChange} minLength={5} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="cpassword" value={createUser.cpassword} placeholder="Password" onChange={onChange} minLength={5} required/>
                </Form.Group>
                <div className="mt-4 text-center " style={{marginLeft: "-2rem"}}>
                <Button variant="primary" type="submit" >
                    Submit
                </Button>
                </div>
            </Form>
        </div>
    )
}

export default Signup
