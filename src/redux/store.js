import { createStore } from 'redux'
import books from './reducers/books'

export default createStore(books, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());