import React from 'react';
import {getFirebase} from "../firebase";
import 'firebase/auth';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class AdminPanel extends React.Component {

    state = {
        requests: []
    }

    loadRequests() {
        let firebase = getFirebase();
        let database = firebase.database();
        database.ref('requests').on('value', (snapshot) => {
            this.setState({requests: snapshot.val()});
        });
    }

    componentDidMount() {
        this.loadRequests();
    }

    render() {
        let requests = this.state.requests;
        let reviews = [];
        Object.keys(requests).forEach((school) => {
            Object.values(requests[school]).forEach((review) => {
                reviews.push(review);
            })
        })
        return (
            <>
                {reviews.map((rev) => (
                    <p>{rev.quality}</p>
                ))}
            </>
        )
    }
}

export default AdminPanel;