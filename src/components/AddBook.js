import React from 'react';
import { connect } from "react-redux";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { BookObject } from '../models/BookObject';
import Form from 'react-bootstrap/Form'
import { addBook } from '../redux/actions'


class AddBook extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            show : false,
            book : new BookObject(),
            toast : false
        }

        this.toggleModal = () => {
            this.setState(prevState => ({
                show: !prevState.show
            }))
        }

        this.handleTitleChange = (event) => {
            event.persist();
            this.setState( prevState => ({
                book : {
                    ...prevState.book,
                    title: event.target.value
                }
            }))
        }

        this.handleAuthorChange = (event) => {
            event.persist();
            this.setState( prevState => ({
                book : {
                    ...prevState.book,
                    author : event.target.value
                }
            }))
        }

        this.handleSubmit = () => {
            this.props.addBook(this.state.book);

            this.setState({
                show : false,
                book : new BookObject()
            })
            
        }
    }

    render(){

        return(
            <div>
                <Button variant="info" onClick={this.toggleModal} >Add Book</Button>

                <Modal show={this.state.show} onHide={this.toggleModal}>
                    <Modal.Header>
                        <Modal.Title>Add Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Label>Title:</Form.Label><br/>
                            <input type="text" placeholder="Enter Title" value={this.state.book.title} onChange={this.handleTitleChange}/><br/>
                            <Form.Label>Author:</Form.Label><br/>
                            <input type="text" placeholder="Enter Author" value={this.state.book.author} onChange={this.handleAuthorChange}/>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggleModal}>Close</Button>
                        <Button variant="primary" onClick={this.handleSubmit}>Add Book</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
       
    }
}

export default connect(
    null,
    { addBook }
)(AddBook);