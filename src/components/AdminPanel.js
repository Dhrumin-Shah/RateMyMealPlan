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
        let firebase = getFirebase();
        let database = firebase.database();
        let conBtn = document.getElementById('confirmBtn');
        let delBtn = document.getElementById('deleteBtn');
        conBtn.addEventListener('click', () => {
            let reqId = document.getElementById('reqId').value;
            let college = document.getElementById('collegeName').value;
            let postData = {}
            let rankData = {};
            let reviewCount = 0;
            database.ref('reviewCount/').on('value', (snapshot) => {
                reviewCount = snapshot.val();
                reviewCount += 1;
            })
            database.ref('requests/' + college + '/' + reqId).on('value', (snapshot) => {
                postData = snapshot.val();
            });
            database.ref('rankings/' + college).on('value', (snapshot) => {
                rankData = snapshot.val();
                if (rankData === null) {
                    rankData = {};
                    rankData.reviews = 1;
                    rankData.value = + parseInt(postData.value);
                    rankData.quality = + parseInt(postData.quality);
                    rankData.service = + parseInt(postData.service);
                    rankData.availability = + parseInt(postData.availability);
                    rankData.vegan = + parseInt(postData.vegan);
                    rankData.kosher = + parseInt(postData.kosher);
                    rankData.halal = + parseInt(postData.halal);
                    if (!(rankData.vegan === 0)){
                        rankData.veganCounter = 1;
                    } else {
                        rankData.veganCounter = 0;
                    }
                    if (!(rankData.halal === 0)){
                        rankData.halalCounter = 1;
                    } else {
                        rankData.halalCounter = 0;
                    }
                    if (!(rankData.kosher === 0)){
                        rankData.kosherCounter = 1;
                    } else {
                        rankData.kosherCounter = 0;
                    }
                } else {
                    rankData.reviews += 1;
                    rankData.value = (((rankData.value * (rankData.reviews - 1)) + parseInt(postData.value)) / rankData.reviews);
                    rankData.quality = (((rankData.quality * (rankData.reviews - 1)) + parseInt(postData.quality)) / rankData.reviews);
                    rankData.service = (((rankData.service * (rankData.reviews - 1)) + parseInt(postData.service)) / rankData.reviews);
                    rankData.availability = (((rankData.availability * (rankData.reviews - 1)) + parseInt(postData.availability)) / rankData.reviews);
                    if (parseInt(postData.vegan) !== 0) {
                        rankData.veganCounter += 1;
                        rankData.vegan = (((rankData.vegan * (rankData.veganCounter - 1)) + parseInt(postData.vegan)) / rankData.veganCounter);
                    }
                    if (parseInt(postData.kosher) !== 0) {
                        rankData.kosherCounter += 1;
                        rankData.kosher = (((rankData.kosher * (rankData.kosherCounter - 1)) + parseInt(postData.kosher)) / rankData.kosherCounter);
                    }
                    if (parseInt(postData.halal) !== 0) {
                        rankData.halalCounter += 1;
                        rankData.halal = (((rankData.halal * (rankData.halalCounter - 1)) + parseInt(postData.halal)) / rankData.halalCounter);
                    }
                }
            });
            let updates = {};
            let newKey = database.ref().child('reviews/' + college).push().key;
            postData.id = newKey;

            setTimeout(() => {
                updates['reviews/' + college + '/' + newKey] = postData;
                updates['rankings/' + college] = rankData;
                updates['reviewCount'] = reviewCount;
                database.ref().update(updates);
                database.ref().child('requests/' + college + '/' + reqId).remove();
            }, 2000);
        });
        delBtn.addEventListener('click', () => {
            let reqId = document.getElementById('reqId').value;
            let college = document.getElementById('collegeName').value;
            database.ref().child('requests/' + college + '/' + reqId).remove();
        });
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
            <div className="sortRequests">
                {reviews.map((rev) => (
                    <div className="requestBox">
                        <span>College: {rev.college}</span> <br />
                        <span>Quality: {rev.quality}</span> <br />
                        <span>Value: {rev.value}</span> <br />
                        <span>Service: {rev.service}</span> <br />
                        <span>Availability: {rev.availability}</span> <br />
                        <span>Review: {rev.review}</span> <br />
                        <span>Vegan: {rev.vegan}</span> <br />
                        <span>Halal: {rev.halal}</span> <br />
                        <span>Kosher: {rev.kosher}</span> <br />
                        <span>Recommendations: {rev.recommendations}</span> <br />
                        <span>ID: {rev.id}</span>
                    </div>
                ))}
            </div>
            <div className="valRequests">
                <Form.Group controlId="reqId">
                    <Form.Label>Enter request id</Form.Label>
                    <Form.Control type="text" placeholder="Request ID" />
                </Form.Group>
                <Form.Group controlId="collegeName">
                    <Form.Label>Enter college name</Form.Label>
                    <Form.Control type="text" placeholder="College" />
                </Form.Group>
                <Button type="button" variant="success" id="confirmBtn">Confirm</Button>
                <Button type="button" variant="danger" id="deleteBtn">Delete</Button>
            </div>
            </>
        )
    }
}

export default AdminPanel;