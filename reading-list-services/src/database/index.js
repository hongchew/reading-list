import Sequelize from 'sequelize';

let db = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
})
db.sync();


class Book extends Sequelize.Model {}
Book.init({
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    details: {
        type: Sequelize.STRING
    }
},{
    sequelize : db,
    modelName: 'Book'
})

Book.sync();

const init = async () => {
    if( await Book.findOne( { where : {
        id : 1
    }})){
        return Promise.resolve()
    }

    return Promise.all([
        Book.create({
            id: "1",
            title: "Harry Potter and the Philosopher's Stone",
            author: "J. K. Rowling",
            details: JSON.stringify({
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                comments : [
                    { 
                        id : 1,
                        author : "Daniel",
                        content : "This is an amazing book!"
                    },
                    {
                        id : 2, 
                        author : "Keith",
                        content : "Old but gold"
                    }
                ]
            })
        }),
        Book.create({
            id: "2",
            title: "Harry Potter and the Chamber of Secrets",
            author: "J. K. Rowling",
            details: JSON.stringify({
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                comments : [
                    { 
                        id : 3,
                        author : "Angela",
                        content : "I can't believe the plot twist!"
                    },
                    {
                        id : 4,
                        author : "Bili",
                        content : "I've read it 20 times already"
                    }
                ]
            })
        }),
        Book.create({
            id: "3",
            title: "Harry Potter and the Prisoner of Azkaban",
            author: "J. K. Rowling",
            details: JSON.stringify({
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                comments : [
                    { 
                        id : 5,
                        author : "Evelyn",
                        content : "What can I do without this book?"
                    },
                    {
                        id : 6,
                        author : "Charles",
                        content : "I really love it"
                    }
                ]
            })
        })
    ])
}

init().then( () =>  db)

const createBook = async book => {
    let newBook =  await Book.create({
        id: book.id,
        title: book.title,
        author: book.author,
        details: JSON.stringify({
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            comments : [
            ]
        })
    })
    newBook = newBook.get();
    newBook.details = JSON.parse(newBook.details);
    return newBook;
}

module.exports.getDetails = async book => {

    let dbBook = await Book.findOne({
        where : {
            author : book.author,
            title : book.title
        }
    })

    if(!dbBook){
        return await createBook(book)
    }

    dbBook.details = JSON.parse(dbBook.details)
    return dbBook;
}

module.exports.addComment = async ( book, comment ) => {
    let dbBook = await Book.findOne({
        where : {
            author : book.author,
            title : book.title
        }
    })

    if(!dbBook){
        dbBook = await createBook(book)
    }else{
        dbBook = dbBook.get()
        dbBook.details = JSON.parse(dbBook.details)
    }

    dbBook.details.comments.push(comment);

    return await Book.update({
        details : JSON.stringify(dbBook.details)
    }, {
        where: {
            id : book.id
        }
    })

}
