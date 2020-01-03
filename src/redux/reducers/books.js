import { type } from '../actions'
import { status } from '../../models/bookStatus'
const uuidv4 = require('uuid/v4');


const initialState = {
    books: [
        {
            id: uuidv4(),
            title: "Harry Potter and the Philosopher's Stone",
            author: "J. K. Rowling",
            currentPage: 300,
            status : status.COMPLETED

        },
        {
            id: uuidv4(),
            title: "Harry Potter and the Chamber of Secrets",
            author: "J. K. Rowling",
            currentPage: 145,
            status : status.IN_PROGRESS
        },
        {
            id: uuidv4(),
            title: "Harry Potter and the Prisoner of Azkaban",
            author: "J. K. Rowling",
            currentPage: 0,
            status : status.NOT_STARTED
        }
    ]
}

export default (state = initialState, action) => {
    
    switch(action.type){
        case type.ADD_BOOK:
            return {...state, books: [...state.books, action.payload] }
            
        case type.MARK_COMPLETE:
            return {...state, books: [...state.books.map( book =>{ 
                if(book.id === action.payload.id) {
                    book.status = status.COMPLETED;
                }
                return book;
            })]}
            
        case type.UPDATE_PAGE:
            return {...state, books: [...state.books.map( book =>{
                if(book.id === action.payload.book.id) {
                    action.payload.book.currentPage = action.payload.pageNumber
                    action.payload.book.status = status.IN_PROGRESS; 
                }
                return book;
            })]}

        case type.REMOVE_BOOK:
            return {...state, books: [...state.books.filter( book => book !== action.payload)]}
        
        default:
            return state;


    }

}