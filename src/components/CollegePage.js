import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {getFirebase} from "../firebase";
import ReviewBox from "./ReviewBox";

class CollegePage extends React.Component {

    render() {
        let college = window.location.pathname.substring(9);
        college = college.replace(/_/g, " ");
        let database = getFirebase().database();
        return(
            <Container>
                <h1>{college}</h1>
                <div>DATA</div>
                <Tabs defaultActiveKey="reviews" id="collegeData">
                    <Tab eventKey="reviews" title="Reviews">
                        <ReviewBox college={college} />
                    </Tab>
                    <Tab eventKey="recommendations" title="Recommendations">

                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

export default CollegePage;