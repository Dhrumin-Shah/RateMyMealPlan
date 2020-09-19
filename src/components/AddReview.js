import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getFirebase } from "../firebase";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from "react-bootstrap/Badge";
import moment from 'moment';

class AddReview extends React.Component {

    valueData() {
        let valueRange = document.getElementById('valueRange');
        let valueBadge = document.getElementById('valueBadge');
        valueRange.addEventListener('input', () => {
            switch (valueRange.value) {
                case '1':
                    valueBadge.innerHTML = "1/5";
                    break;
                case '2':
                    valueBadge.innerHTML = "2/5";
                    break;
                case '3':
                    valueBadge.innerHTML = "3/5";
                    break;
                case '4':
                    valueBadge.innerHTML = "4/5";
                    break;
                case '5':
                    valueBadge.innerHTML = "5/5";
                    break;
            }
        });
    }

    qualityData() {
        let qualityRange = document.getElementById('qualityRange');
        let qualityBadge = document.getElementById('qualityBadge');
        qualityRange.addEventListener('input', () => {
            switch (qualityRange.value) {
                case '1':
                    qualityBadge.innerHTML = '1/5';
                    break;
                case '2':
                    qualityBadge.innerHTML = '2/5';
                    break;
                case '3':
                    qualityBadge.innerHTML = '3/5';
                    break;
                case '4':
                    qualityBadge.innerHTML = '4/5';
                    break;
                case '5':
                    qualityBadge.innerHTML = '5/5';
                    break;
            }
        });
    }

    serviceData() {
        let serviceRange = document.getElementById('serviceRange');
        let serviceBadge = document.getElementById('serviceBadge');
        serviceRange.addEventListener('input', () => {
            switch (serviceRange.value) {
                case '1':
                    serviceBadge.innerHTML = '1/5';
                    break;
                case '2':
                    serviceBadge.innerHTML = '2/5';
                    break;
                case '3':
                    serviceBadge.innerHTML = '3/5';
                    break;
                case '4':
                    serviceBadge.innerHTML = '4/5';
                    break;
                case '5':
                    serviceBadge.innerHTML = '5/5';
                    break;
            }
        });
    }

    availabilityData() {
        let availabilityRange = document.getElementById('availabilityRange');
        let availabilityBadge = document.getElementById('availabilityBadge');
        availabilityRange.addEventListener('input', () => {
            switch (availabilityRange.value) {
                case '1':
                    availabilityBadge.innerHTML = '1/5';
                    break;
                case '2':
                    availabilityBadge.innerHTML = '2/5';
                    break;
                case '3':
                    availabilityBadge.innerHTML = '3/5';
                    break;
                case '4':
                    availabilityBadge.innerHTML = '4/5';
                    break;
                case '5':
                    availabilityBadge.innerHTML = '5/5';
                    break;
            }
        });
    }

    handleForm() {
        let firebase = getFirebase();
        let database = firebase.database();
        let submit = document.getElementById('submitBtn');
        submit.addEventListener('click', () => {
            if (this.checkForm() === true) {
                let college = document.getElementById('collegeSelect').value;
                if (college === 'Select') {
                    college = document.getElementById('newCollege').value;
                }
                let value = document.getElementById('valueRange').value;
                let quality = document.getElementById('qualityRange').value;
                let service = document.getElementById('serviceRange').value;
                let availability = document.getElementById('availabilityRange').value;
                let review = document.getElementById('reviewText').value;
                let vegan = document.getElementById('vegan').value;
                let halal = document.getElementById('halal').value;
                let kosher = document.getElementById('kosher').value;
                let semester = document.getElementById('semester').value;
                let year = document.getElementById('year').value;
                let recommendations = document.getElementById('recommendations').value;
                let newKey = database.ref().child('requests/' + college).push().key;
                let updates = {};
                let now = moment();
                let tsmonth = now.month() + 1;
                let tsdate = now.date();
                let tsyear = now.year();
                let timestamp = tsmonth + '/' + tsdate + '/' + tsyear;
                let postData = {
                    value: value,
                    quality: quality,
                    service: service,
                    availability: availability,
                    review: review,
                    vegan: vegan,
                    kosher: kosher,
                    halal: halal,
                    recommendations: recommendations,
                    college: college,
                    id: newKey,
                    date: timestamp,
                    semester: semester,
                    year: year
                };
                updates['/requests/' + college + '/' + newKey] = postData;
                database.ref().update(updates);
            } else {
                let errors = this.checkForm();
                let msg = '';
                errors.forEach((err) => {
                    msg += err + '\n';
                })
                alert(msg);
            }
        });

    }

    checkForm() {
        let college = document.getElementById('collegeSelect').value;
        let newCollege = document.getElementById('newCollege').value;
        let semester = document.getElementById('semester').value;
        let year = document.getElementById('year').value;
        let review = document.getElementById('reviewText').value;
        let errors = [];
        if (college === 'Select' && newCollege === '') {
            errors.push('Please select a college');
        }
        if (semester === 'Semester') {
            errors.push('Please select a semester');
        }
        if (year === 'Year') {
            errors.push('Please select a year');
        }
        if (review.length < 20) {
            errors.push('Please write at least 20 characters');
        }
        if (errors.length === 0) {
            return true;
        } else {
            return errors;
        }
    }



    componentDidMount() {
        this.valueData();
        this.qualityData();
        this.serviceData();
        this.availabilityData()
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
                    <p>Indicated by *</p>
                    <p>Reviews will be added after revision. Please refrain from using vulgar language.</p>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>When did you have a meal plan?*</Form.Label>
                        <Col sm={4}>
                            <Form.Control id="semester" as="select" defaultValue="Semester">
                                <option>Semester</option>
                                <option>Fall</option>
                                <option>Winter</option>
                                <option>Spring</option>
                                <option>Summer</option>
                            </Form.Control>
                        </Col>
                        <Col sm={4}>
                            <Form.Control id="year" as="select" defaultValue="Year">
                                <option>Year</option>
                                <option>2020</option>
                                <option>2019</option>
                                <option>2018</option>
                                <option>2017</option>
                                <option>2016</option>
                                <option>2015</option>
                                <option>2014</option>
                                <option>2013</option>
                                <option>2012</option>
                                <option>2011</option>
                                <option>2010</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col lg="6" sm="12">
                            <Form.Group controlId="qualityRange">
                                <Form.Label>Quality*</Form.Label>
                                <Badge className='badgeData' variant="secondary" id="qualityBadge">1/5</Badge>
                                <Form.Control type="range" min={1} max={5} defaultValue={1} custom />
                                <Form.Text id='qualityRangeText'>How did the food taste? Did you find it unappetising?</Form.Text>
                            </Form.Group>
                        </Col>
                        <Col lg="6" sm="12">
                            <Form.Group controlId="valueRange">
                                <Form.Label>Value*</Form.Label>
                                <Badge className='badgeData' variant="secondary" id="valueBadge">1/5</Badge>
                                <Form.Control type="range" min={1} max={5} defaultValue={1} custom />
                                <Form.Text id='valueRangeText'>Is it worth the money?</Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6" sm="12">
                            <Form.Group controlId="serviceRange">
                                <Form.Label>Service*</Form.Label>
                                <Badge className='badgeData' variant="secondary" id="serviceBadge">1/5</Badge>
                                <Form.Control type="range" min={1} max={5} defaultValue={1} custom />
                                <Form.Text id='serviceRangeText'>Was the staff rude? Were they accommodating?</Form.Text>
                            </Form.Group>
                        </Col>
                        <Col lg="6" sm="12">
                            <Form.Group controlId="availabilityRange">
                                <Form.Label>Availability*</Form.Label>
                                <Badge className='badgeData' variant="secondary" id="availabilityBadge">1/5</Badge>
                                <Form.Control type="range" min={1} max={5} defaultValue={1} custom />
                                <Form.Text id='valueRangeText'>Were there enough dining locations? Did you have to travel far to use your meal plan?</Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId='reviewText'>
                        <Form.Label>Comment on your experience*</Form.Label>
                        <Form.Control as='textarea' rows='5' maxLength={3000} />
                    </Form.Group>
                    <Form.Group as={Row} controlId="dietaryRestrictions">
                        <Col sm={4}>
                        <Form.Label>Vegan options?</Form.Label>
                            <Form.Control id='vegan' as="select" style={{width: "60px"}} defaultValue={0}>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Col>
                        <Col sm={4}>
                        <Form.Label>Halal options?</Form.Label>
                        <Form.Control id='halal' as="select" style={{width: "60px"}} defaultValue={0}>
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                        </Col>
                        <Col sm={4}>
                        <Form.Label>Kosher options?</Form.Label>
                        <Form.Control id='kosher' as="select" style={{width: "60px"}} defaultValue={0}>
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId='recommendations'>
                        <Form.Label>Recommend off-campus dining options</Form.Label>
                        <Form.Control as='textarea' rows='3' maxLength={3000} />
                        <Form.Text>Please just write restaurant names separated by commas</Form.Text>
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