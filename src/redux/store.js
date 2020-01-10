import { createStore } from 'redux'
import books from './reducers/books'
import { loadState } from './localStorage'

const persistedState = loadState();

export default createStore(books, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());