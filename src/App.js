import React from 'react';
import { connect } from "react-redux";
import AddBook from './components/AddBook'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import CurrentlyReadingList from './components/CurrentlyReadingList';
import NotStartedList from './components/NotStartedList';
import CompletedList from './components/CompletedList';



class App extends React.Component {

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="xl">
          <Navbar.Brand>My Reading List</Navbar.Brand>
          <Nav>
            <AddBook/>
          </Nav>
        </Navbar>

		<Container>
			<br/>
			<h3>Currently Reading:</h3>
			<CurrentlyReadingList />
		
			<br/>
			<h3>Not Started:</h3>
			<NotStartedList />
		
			<br/>
			<h3>Completed:</h3>
			<CompletedList />
		</Container>     
      </div>
    );

  }
  
}

function mapStateToProps(state) {
	return(
		{
			books : [...state.books]
		}
	)
  
}

export default connect(mapStateToProps)(App);
