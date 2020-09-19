import React from 'react';
import CollegeListItem from "./CollegeListItem";
import ListGroup from "react-bootstrap/ListGroup";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Colleges extends React.Component {

    render() {
        let colleges = this.props.colleges.sort();
        let numColleges = colleges.length;
        let collegeCol1 = colleges.slice(0, numColleges/2);
        let collegeCol2 = colleges.slice(numColleges/2, numColleges);
        return (
            <div className="collegeListContainer">
                <Row>
                    <Col md={6} sm={12}>
                        <div className="collegeList">
                            {collegeCol1.map((college, index) => (
                                <CollegeListItem key={index} college={college}/>
                            ))}
                        </div>
                    </Col>
                    <Col md={6} sm={12}>
                        <div className="collegeList">
                            {collegeCol2.map((college, index) => (
                                <CollegeListItem key={index} college={college}/>
                            ))}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Colleges;