import {status} from './bookStatus'
import {v4} from 'uuid'

export class BookObject {

    constructor(title = '', author = ''){
        this.id = v4();
        this.title = title;
        this.author = author;
        this.currentPage = 0;
        this.status = status.NOT_STARTED
    }

}