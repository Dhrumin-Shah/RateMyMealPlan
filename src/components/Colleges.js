import React from 'react';
import CollegeListItem from "./CollegeListItem";
import ListGroup from "react-bootstrap/ListGroup";

class Colleges extends React.Component {

    render() {
        let colleges = this.props.colleges.sort();
        return (
            <ListGroup>
                {colleges.map((college, index) => (
                    <CollegeListItem key={index} college={college}/>
                ))}
            </ListGroup>
        );
    }
}

export default Colleges;