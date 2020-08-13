import React from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";

class CollegeSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            loading: false,
            colleges: this.props.colleges,
            results: []
        };
    }

    handleOnInputChange = (event) => {
        let query = event.target.value;
        setTimeout(() => {
            if (!query) {
                clearTimeout(1000);
                this.setState({query: query, results: [], message: '', colleges: this.props.colleges});
            } else {
                this.setState({query: query, loading: true, message: '', colleges: this.props.colleges}, this.findCollege(query));
            }
        }, 1000);
    }

    findCollege(query) {
        let results = [];
        let colleges = this.state.colleges;
        colleges.map((algo) => {
            query.split(" ").map((word) => {
                if(algo.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
                    results.push(algo);
                }
            })
        })
        this.setState({query: query, loading: false, results: results, message: '', colleges: this.props.colleges});
    }

    render() {
        let results = this.state.results;
        return (
            <>
                <FormControl onChange={this.handleOnInputChange} id="collegeSearch" type="text" placeholder="Search for your school" className="mr-sm-2" />
                <p className="text-center">Don't see your school? Add a review to open your school's page</p>
                <ListGroup className="searchResults">
                    {results.map((result) => (
                        <ListGroupItem action href={'/college/'+result.replace(/ /g, '_')} className="searchResult">{result}</ListGroupItem>
                        )
                    )}
                </ListGroup>
            </>
        )
    }
}

export default CollegeSearch;