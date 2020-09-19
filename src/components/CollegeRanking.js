import React from 'react';
import {getFirebase} from "../firebase";
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CollegeRanking extends React.Component {

    state = {
        quality: 0,
        value: 0,
        service: 0,
        availability: 0,
        reviews: 0,
        vegan: 0,
        veganCount: 0,
        kosher: 0,
        kosherCount: 0,
        halal: 0,
        halalCount: 0,
    }

    componentDidMount() {
        let firebase = getFirebase();
        let database = firebase.database();
        let college = this.props.college;
        database.ref('rankings/' + college).on('value', (snapshot) => {
            let rankData = snapshot.val();
            if (!(rankData === null)) {
                this.setState({
                    quality: rankData.quality,
                    value: rankData.value,
                    service: rankData.service,
                    availability: rankData.availability,
                    reviews: rankData.reviews,
                    vegan: rankData.vegan,
                    veganCount: rankData.veganCounter,
                    kosher: rankData.kosher,
                    kosherCount: rankData.kosherCounter,
                    halal: rankData.halal,
                    halalCount: rankData.halalCounter,
                });
            }
        })
    }

    render() {
        return (
            <Row>
                <Col xs={6} md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Value</Card.Title>
                            <Card.Text>
                                <Badge variant="secondary">{this.state.value}/5</Badge>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={6} md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Quality</Card.Title>
                            <Card.Text>
                                <Badge variant="secondary">{this.state.quality}/5</Badge>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={6} md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Service</Card.Title>
                            <Card.Text>
                                <Badge variant="secondary">{this.state.service}/5</Badge>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card xs={6} md={3}>
                        <Card.Body>
                            <Card.Title>Availability</Card.Title>
                            <Card.Text>
                                <Badge variant="secondary">{this.state.availability}/5</Badge>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={6} md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Vegan</Card.Title>
                            <Card.Text>
                                <Badge variant="secondary">{this.state.vegan}/5</Badge> <br />
                                {this.state.veganCount} reviews
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={6} md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Kosher</Card.Title>
                            <Card.Text>
                                <Badge variant="secondary">{this.state.kosher}/5</Badge> <br />
                                {this.state.kosherCount} reviews
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={6} md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Halal</Card.Title>
                            <Card.Text>
                                <Badge variant="secondary">{this.state.halal}/5</Badge> <br />
                                {this.state.halalCount} reviews
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={6} md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Total Reviews</Card.Title>
                            <Card.Text>
                                <Badge variant="secondary">{this.state.reviews}</Badge> <br />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default CollegeRanking;