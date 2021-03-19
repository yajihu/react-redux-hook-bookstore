import React from 'react';
import { useSelector, useDispatch } from 'react-redux';


//Single todo item component
const BookItem = (props) => {
    //Get bookList from todoReducer
    const bookList = useSelector(state => state.todos.bookList)
    //Use for all the dispatch actions
    const dispatch = useDispatch();

    //Remove single todo in the list
    const removeBookItem = (todoId) => {
        //filter to get the todoId which need to be remove
        let newTodoList = bookList.filter(item => item.id !== todoId);
        dispatch({ type: 'REMOVE_TODO', payload: newTodoList })

    }

    return (
        <tr className="collection-item" key={props.item.id}>

            <td>{props.item.name}</td>
            <td>{props.item.price}</td>
            <td>{props.item.category}</td>

            <span
                onClick={() => {
                    removeBookItem(props.item.id)
                }}
                className="secondary-content">
                <i className="remove-btn material-icons blue-text">clear</i>
            </span>
        </tr>
    );
}

export default BookItem;