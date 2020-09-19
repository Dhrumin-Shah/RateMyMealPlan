import React from 'react';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

class CollegeListItem extends React.Component {


    render() {
        let collegeName = this.props.college;
        collegeName = collegeName.replace(/ /g, '_');
        return(
            <div className="text-center">
                <a action href={'/college/'+collegeName}>{this.props.college}</a>
            </div>
        )
    }
}

export default CollegeListItem;