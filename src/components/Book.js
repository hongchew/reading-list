import React from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";

class Book extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            book : this.props.book
        }

    }

    render(){
        return(
            <div>
                <Card.Title>{this.props.book.title}</Card.Title>
                <Card.Subtitle><i>{this.props.book.author}</i></Card.Subtitle>
            </div>
        )
    }

}

export default connect(
    (state, ownProps) => {
        return ownProps
    }
)(Book);