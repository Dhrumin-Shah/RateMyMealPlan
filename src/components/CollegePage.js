import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {getFirebase} from "../firebase";
import ReviewBox from "./ReviewBox";
import CollegeRanking from "./CollegeRanking";

class CollegePage extends React.Component {

    render() {
        let college = window.location.pathname.substring(9);
        college = college.replace(/_/g, " ");
        let database = getFirebase().database();
        return(
            <>
                <div className="collegeBanner">
                    <h1 className="text-center">{college}</h1>
                </div>
                <Container>
                    <CollegeRanking college={college} />
                    <ReviewBox college={college} />
                </Container>
            </>
        )
    }
}

export default CollegePage;