const initState = {
    bookList: [
        {
            id: 1,
            name: 'Harry Potter',
            price: '20',
            category: 'Fantasy Fiction',
            description: 'Harry Potter is a series of seven fantasy novels written by British author, J. K. Rowling.'
        }, {
            id: 2,
            name: 'The Great Gatsby',
            price: '35',
            category: 'Tragedy',
            description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island.'
        }, {
            id: 3,
            name: '斗破苍穹',
            price: '200',
            category: 'Fantasy Fiction',
            description: 'Fantasy Fiction book written by Potato.'
        }
    ]
}

const todoReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                bookList: [
                    ...state.bookList,
                    action.payload
                ]
            }
        case 'REMOVE_TODO':
            return {
                ...state,
                bookList: action.payload
            }
        default:
            return state
    }
}

export default todoReducer;