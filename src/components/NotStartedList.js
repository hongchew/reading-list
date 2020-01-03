import React from "react";
import { connect } from "react-redux";
import Book from './Book'
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { removeBook, updatePage } from "../redux/actions"
import { status } from "../models/bookStatus"


class NotStartedList extends React.Component{

    constructor(props){
        super(props)

        this.handleRemove = book => {
            this.props.removeBook(book)
        }

        this.handleStart = book => {
            this.props.updatePage(book, 1);
        }
    }

    render(){

        return(
            <Container>
                {this.props.books.map( book => (
                    <Card>
                        <Card.Body>
                            <Book book={book}/>
                            <br/>
                            <Button onClick={() => this.handleStart(book)}> Start Reading </Button>
                            <Button variant="danger" onClick={() => this.handleRemove(book)}> Remove </Button>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        )
    }

}

export default connect(
    (state) => {
        const books = state.books.filter( book => book.status === status.NOT_STARTED )
        return { books }
    }
    ,{ 
        removeBook,
        updatePage
    }
)(NotStartedList);