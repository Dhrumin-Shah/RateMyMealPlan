import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getFirebase } from "../firebase";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from "react-bootstrap/Badge";

class AddReview extends React.Component {

    valueText() {
        let valueRange = document.getElementById('valueRange');
        let valueBadge = document.getElementById('valueBadge');
        valueRange.addEventListener('input', () => {
            let valueRangeText = document.getElementById('valueRangeText');
            switch (valueRange.value) {
                case '1':
                    valueBadge.innerHTML = "1/5";
                    valueRangeText.innerHTML = 'Cheaper to DoorDash every day';
                    break;
                case '2':
                    valueBadge.innerHTML = "2/5";
                    valueRangeText.innerHTML = 'Why did I pay for this';
                    break;
                case '3':
                    valueBadge.innerHTML = "3/5";
                    valueRangeText.innerHTML = 'Good enough';
                    break;
                case '4':
                    valueBadge.innerHTML = "4/5";
                    valueRangeText.innerHTML = 'I don\'t need food in my dorm';
                    break;
                case '5':
                    valueBadge.innerHTML = "5/5";
                    valueRangeText.innerHTML = 'How am I getting this much food';
                    break;
            }
        });
    }

    qualityText() {
        let qualityRange = document.getElementById('qualityRange');
        let qualityBadge = document.getElementById('qualityBadge');
        qualityRange.addEventListener('input', () => {
            let qualityRangeText = document.getElementById('qualityRangeText');
            switch (qualityRange.value) {
                case '1':
                    qualityBadge.innerHTML = '1/5';
                    qualityRangeText.innerHTML = 'Food poisoning?';
                    break;
                case '2':
                    qualityBadge.innerHTML = '2/5';
                    qualityRangeText.innerHTML = 'I need to learn how to cook';
                    break;
                case '3':
                    qualityBadge.innerHTML = '3/5';
                    qualityRangeText.innerHTML = 'Good enough';
                    break;
                case '4':
                    qualityBadge.innerHTML = '4/5';
                    qualityRangeText.innerHTML = 'Why eat out?';
                    break;
                case '5':
                    qualityBadge.innerHTML = '5/5';
                    qualityRangeText.innerHTML = 'Michelin star worthy';
                    break;
            }
        });
    }

    handleForm() {
        let firebase = getFirebase();
        let database = firebase.database();
        let submit = document.getElementById('submitBtn');
        submit.addEventListener('click', () => {
            let college = document.getElementById('collegeSelect').value;
            if (college === 'Select') {
                college = document.getElementById('newCollege').value;
            }
            let value = document.getElementById('valueRange').value;
            let quality = document.getElementById('qualityRange').value;
            let review = document.getElementById('reviewText').value;
            let postData = {
                value: value,
                quality: quality,
                review: review
            };
            let newKey = database.ref().child('requests/' + college).push().key;
            let updates = {};
            updates['/requests/' + college + '/' + newKey] = postData;
            database.ref().update(updates);
        });

    }

    componentDidMount() {
        this.valueText();
        this.qualityText();
        this.handleForm();
    }

    render() {
        return(
            <Container>
                <Form>
                    <Row>
                        <Col lg="6" sm="12">
                            <Form.Group controlId="collegeSelect">
                                <Form.Label>Select your school</Form.Label>
                                <Form.Control as="select">
                                    <option>Select</option>
                                    {this.props.colleges.sort()}
                                    {this.props.colleges.map((college, index) => (
                                        <option key={index}>{college}</option>
                                        )
                                    )}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col lg="6" sm="12">
                            <Form.Group controlId="newCollege">
                                <Form.Label>Don't see your school? Add it below</Form.Label>
                                <Form.Control type="text" placeholder="Enter school name" />
                                <Form.Text>We'll add your school in a couple days</Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <h3>Please answer all required questions below</h3>
                    <p>Reviews will be added after revision, usually in a couple days</p>
                    <Form.Group as={Row} controlId="formGridState">
                        <Form.Label column sm={4}>When did you have a meal plan?</Form.Label>
                        <Col sm={8}>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col lg="6" sm="12">
                            <Form.Group controlId="qualityRange">
                                <Form.Label>Is the food good?</Form.Label>
                                <Badge variant="secondary" id="qualityBadge">1/5</Badge>
                                <Form.Control type="range" min={1} max={5} defaultValue={1} custom />
                                <Form.Text id='qualityRangeText'>Enter a value from 1-5</Form.Text>
                            </Form.Group>
                        </Col>
                        <Col lg="6" sm="12">
                            <Form.Group controlId="valueRange">
                                <Form.Label>Is it worth the money?</Form.Label>
                                <Badge variant="secondary" id="valueBadge">1/5</Badge>
                                <Form.Control type="range" min={1} max={5} defaultValue={1} custom />
                                <Form.Text id='valueRangeText'>Enter a value from 1-5</Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6" sm="12">
                            <Form.Group controlId="serviceRange">
                                <Form.Label>How is the service?</Form.Label>
                                <Badge variant="secondary" id="serviceBadge">1/5</Badge>
                                <Form.Control type="range" min={1} max={5} defaultValue={1} custom />
                                <Form.Text id='serviceRangeText'>Enter a value from 1-5</Form.Text>
                            </Form.Group>
                        </Col>
                        <Col lg="6" sm="12">
                            <Form.Group controlId="locationRange">
                                <Form.Label>Are there enough dining locations?</Form.Label>
                                <Badge variant="secondary" id="locationBadge">1/5</Badge>
                                <Form.Control type="range" min={0} max={5} defaultValue={0} custom />
                                <Form.Text id='valueRangeText'>Enter a value from 1-5</Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId='reviewText'>
                        <Form.Label>Comment on your experience</Form.Label>
                        <Form.Control as='textarea' rows='5' />
                    </Form.Group>
                    <Form.Group controlId="veganRange">
                        <Form.Label>Vegan options?</Form.Label>
                            <Form.Control as="select" style={{width: "75px"}}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>/5
                    </Form.Group>
                    <Form.Group controlId="halalRange">
                        <Form.Label>Adequate halal options? (optional)</Form.Label>
                        <Form.Control type="range" min={0} max={5} defaultValue={0} custom />
                        <Form.Text id='halalRangeText'>Enter a value from 1-5</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="kosherRange">
                        <Form.Label>Adequate kosher options? (optional</Form.Label>
                        <Form.Control type="range" min={0} max={5} defaultValue={0} custom />
                        <Form.Text id='kosherRangeText'>Enter a value from 1-5</Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="button" id='submitBtn'>
                        Submit
                    </Button>
                </Form>
            </Container>
        )
    }
}

export default AddReview;