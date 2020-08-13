import React from 'react';
import './App.css';
import 'firebase/analytics';
import 'firebase/database';
import 'firebase/auth'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Colleges from "./components/Colleges";
import CollegePage from "./components/CollegePage";
import AddReview from "./components/AddReview";
import Admin from './components/Admin';
import AdminPanel from './components/AdminPanel';
import { getFirebase } from "./firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import CollegeSearch from "./components/CollegeSearch";

class App extends React.Component {

    state = {
        colleges: [],
        authenticated: false,
    };

    componentDidMount() {
        let firebase = getFirebase();
        firebase.analytics();
        let database = firebase.database();
        database.ref('colleges/').on('value', (snapshot) => {
            this.setState({colleges: snapshot.val()});
        });
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.setState({authenticated: true});
            } else {
                this.setState({authenticated: false});
            }
        });

    }

    render() {
        return (
            <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">RateMyMealPlan</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                    <Nav.Link href="/review">Review</Nav.Link>
                    <Nav.Link href="/rankings">Rankings</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Router>
                <Switch>
                    <Route path='/college'>
                        <CollegePage />
                    </Route>
                    <Route path='/review'>
                        <AddReview colleges = {this.state.colleges} />
                    </Route>
                    <Route path='/admin'>
                        <Admin />
                    </Route>
                    {this.state.authenticated && <Route path='/adminpanel'>
                        <AdminPanel />
                    </Route>}
                    <Route path='/'>
                            <div className="banner">
                                <Row className="justify-content-center">
                                    <Col xs="10">
                                        <h1 className="text-center">Rate My Meal Plan</h1>
                                        <p className="text-center">See how your college's meal plan compares</p>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col xs="8">
                                        <CollegeSearch colleges={this.state.colleges} />
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Button type="button" href="/review" id="addReview">Add Review</Button>
                                </Row>
                            </div>
                        <Container>
                            <div>
                                <h3>All participating schools</h3>
                                <Colleges colleges={this.state.colleges} />
                            </div>
                        </Container>
                    </Route>
                </Switch>
            </Router>
                </>
        );
    }
}

export default App;