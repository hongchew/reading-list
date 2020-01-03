import React from 'react';
import { connect } from "react-redux";
import AddBook from './components/AddBook'
import Container from 'react-bootstrap/Container'
import CurrentlyReadingList from './components/CurrentlyReadingList';
import NotStartedList from './components/NotStartedList';
import CompletedList from './components/CompletedList';


class App extends React.Component {

  render() {
    return (
      <Container>
        <h1> Reading List </h1>
        <AddBook/>
        <h2>Currently Reading:</h2>
        <CurrentlyReadingList />

        <h2>Not Started:</h2>
        <NotStartedList />

        <h2>Completed:</h2>
        <CompletedList />
      </Container>
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
