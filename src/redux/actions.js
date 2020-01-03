export const type = {
    ADD_BOOK : 'ADD BOOK',
    MARK_COMPLETE : 'MARK COMPLETE',
    UPDATE_PAGE : 'UPDATE PAGE',
    REMOVE_BOOK : 'REMOVE BOOK'
}

export function addBook(book){
    return {
        type: type.ADD_BOOK,
        payload: book
    }
}

export function markComplete(book){
    return {
        type: type.MARK_COMPLETE,
        payload: book
    }
}

export function updatePage(book, pageNumber){
    return {
        type: type.UPDATE_PAGE,
        payload: {
            book: book,
            pageNumber: pageNumber
        }
    }
}

export function removeBook(book){
    return {
        type: type.REMOVE_BOOK,
        payload: book
    }
}
