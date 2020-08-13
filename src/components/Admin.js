import React from 'react';
import {getFirebase} from "../firebase";
import 'firebase/auth';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Admin extends React.Component {

    authenticate() {
        let firebase = getFirebase();
        let email = document.getElementById('adminEmail').value;
        let password = document.getElementById('adminPassword').value;
        firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
            window.location.pathname = '/adminpanel';
        }).catch(function(error) {
            firebase.auth().signOut();
            console.log(error);
        });
    }

    componentDidMount() {
        document.getElementById('submit').addEventListener('click', () => {
            this.authenticate();
        });
    }

    render() {
        return(
            <div>
                <Form>
                    <Form.Group controlId='adminEmail'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId='adminPassword'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" id='submit'>
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Admin;