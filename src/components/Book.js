import React from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {v4 as uuid} from "uuid"




class Book extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            book : this.props.book,
            showModal : false,
            detailsLoaded : false,
            newComment : {
                author : "",
                content : ""
            }
        }

        this.viewDetails = book => {

            fetch(`http://localhost:3001/book/details`, {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(book)
            })
            .then( res => res.json())
            .then( details => {
                console.log(details);
                setTimeout( () => {
                    this.setState({ 
                        bookData : details,
                        detailsLoaded : true
                    })
                }, 1500)
            })            
            
            this.setState({ showModal : true })

        }

        this.handleNewCommentContent = (event) => {
            event.persist()
            this.setState(prevState => ({
                ...prevState,
                newComment : {
                    ...prevState.newComment,
                    content : event.target.value
                }
            }))
        }
        
        this.handleNewCommentAuthor = (event) => {
            event.persist()
            this.setState(prevState => ({
                ...prevState,
                newComment : {
                    ...prevState.newComment,
                    author : event.target.value
                }
            }))
        }

        this.submitComment = () => {
            let newComment = this.state.newComment;
            newComment.id = uuid();
            fetch('http://localhost:3001/book/comment',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    book : {
                        ...this.state.book
                    },
                    comment : newComment
                })
            })

            this.setState( prevState => ({
                ...prevState,
                bookData : {
                    ...prevState.bookData,
                    details : {
                        ...prevState.bookData.details,
                        comments : [...prevState.bookData.details.comments, prevState.newComment]
                    }
                },
                newComment : {
                    author : "",
                    content : ""
                }
            }))


        }

        this.showComments = () => {
            return (
                this.state.bookData.details.comments.map( comment => {
                    return(
                        <Container key={comment.id}>
                            <strong>{comment.author}</strong><br/>
                            {comment.content}
                            <br/>
                        </Container>                               
                    )                               
                })
            )
        }

        this.getDetails = () => {
            if(this.state.detailsLoaded){
                return (
                    <div>
                        <Card.Body>
                            <Card.Title>Description</Card.Title>
                            <Container>{this.state.bookData.details.description}</Container>
                        </Card.Body>
                        
                        <Card.Body>
                            <Card.Title>Comments : </Card.Title>
                            {this.state.bookData.details.comments.length === 0 ? <Container>No Comments Currently</Container> : this.showComments()}
                        </Card.Body>
                    
                        <Card.Body>
                            <Card.Title>Add Comment</Card.Title>
                            <Form>
                                <Form.Control placeholder="Enter Your Name" type="text" onChange={this.handleNewCommentAuthor} value={this.state.newComment.author}/>
                                <Form.Control placeholder="New Comment" as="textarea" rows="3" onChange={this.handleNewCommentContent} value={this.state.newComment.content}/>
                            </Form>
                            <Button variant="link" onClick={this.submitComment}>Submit</Button>
                        </Card.Body>
                    
                    </div>
                )
            }else{ // details not loaded
                return (
                    <Card.Body>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </Card.Body>
                )
            }
        }

        this.hideModal = () => {
            this.setState({ showModal : false })
        }
    }

    render(){
        return(
            <div>
                <Card.Title>{this.props.book.title} <Button variant="link" onClick={() => this.viewDetails(this.props.book)}> View Details </Button></Card.Title>
                <Card.Subtitle><i>{this.props.book.author}</i></Card.Subtitle>
                
                <Modal show={this.state.showModal} onHide={() => this.hideModal()}>
                    <Modal.Header closeButton><Modal.Title>{this.props.book.title}</Modal.Title></Modal.Header>
                    <Modal.Body>
                        <Card>
                            <Card.Body>
                                <Card.Title>Author</Card.Title>
                                <Container><i>{this.props.book.author}</i></Container>
                            </Card.Body>
                        
                            { this.getDetails() }
                        </Card>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}

export default connect(
    (state, ownProps) => {
        return ownProps
    }
)(Book);