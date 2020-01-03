import React from "react";
import { connect } from "react-redux";
import Book from './Book'
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import ButtonToolBar from "react-bootstrap/ButtonToolbar"
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { status } from '../models/bookStatus'
import { removeBook, updatePage, markComplete } from "../redux/actions"

class CurrentlyReadingList extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            show : false,
            bookToUpdate : {}
        }

        this.toggleModal = () =>{
            this.setState(prevState => ({
                show: !prevState.show
            }))
        }

        this.handleRemove = book => {
            this.props.removeBook(book);
        }

        this.handleComplete = book => {
            this.props.markComplete(book);
        }

        this.handleHide = () => {
            this.setState({bookToUpdate : {}}) //reset book to update
            this.toggleModal();
        }

        this.showModal = (book) => {
            this.setState({bookToUpdate : book})
            this.toggleModal();
        }
        
        this.handlePageChange = (event) => {
            event.persist()
            this.setState(prevState => (
                {
                    ...prevState,
                    bookToUpdate : {
                        ...prevState.bookToUpdate,
                        currentPage : event.target.value
                    }
                }
            ))
        }

        this.handleUpdate = (book) => {
            this.props.updatePage(book, this.state.bookToUpdate.currentPage);
            this.handleHide();
        }
    }

    

    render(){

        return(
            <Container>
                {this.props.books.map( book => (
                    <div>
                    <Card>
                        <Card.Body>
                            <Book book={book}/>
                            <Card.Text> Current Page : {book.currentPage}</Card.Text>
                            <ButtonToolBar>
                                <Button onClick={() => this.showModal(book)}> Update </Button>
                                <Button variant="danger" onClick={() => this.handleRemove(book)}> Remove </Button>
                            </ButtonToolBar>
                  
                        </Card.Body>
                    </Card>

                    <Modal show={this.state.show} onHide={this.handleHide}>
                        <Modal.Header>
                            <Modal.Title>Update</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Label>Current Page:</Form.Label><br/>
                                <input type="number" placeholder={book.currentPage} onChange={this.handlePageChange}/>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleHide}>Close</Button>
                            <Button variant="primary" onClick={() => this.handleUpdate(book)}>Update</Button>
                            <Button variant="success" onClick={() => this.handleComplete(book)}>Mark as Completed</Button>
                        </Modal.Footer>
                    </Modal>
                    </div>
                ))}
            </Container>
        )
    }

}

export default connect(
    (state) => {
        const books = state.books.filter( book => book.status === status.IN_PROGRESS )
        return { books }
    }
    ,{ 
        removeBook,
        updatePage, 
        markComplete
    }
)(CurrentlyReadingList);