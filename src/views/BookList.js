import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookItem from '../components/BookItem';
import Modal from 'react-modal';
import 'reactjs-popup/dist/index.css';


const BookList = () => {

  //#2 Used to get a single attribute or object inside the Reducer

  //Get bookList from todoReducer
  const bookList = useSelector(state => state.todos.bookList);

  //Use for all the dispatch actions
  const dispatch = useDispatch();

  //Local state for the input
  const [inputName, setBookName] = useState('');
  const [inputPrice, setBookPrice] = useState('');
  const [inputCategory, setBookCategory] = useState('');
  const [inputDescription, setBookDescription] = useState('');
  //Local state for the input error message
  const [errMsg, setErrMsg] = useState('');

  const [bookId, getBookId] = useState('');
  const [bookName, getBookName] = useState('');
  const [bookPrice, getBookPrice] = useState('');
  const [bookCategory, getBookCategory] = useState('');
  const [bookDescription, getBookDescription] = useState('');

  const [show, setShow] = useState(false);
  const [showEdit, setEditShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);


  //Handle onChange event
  function handleEdit(e) {
    const book = bookList.filter(
      function (bookList) { return bookList.id === e });
    console.log(book)
  }

  const handleNameInput = (e) => {
    setBookName(e.target.value);
  }

  const handlePriceInput = (e) => {
    setBookPrice(e.target.value);
  }

  const handleCategoryInput = (e) => {
    setBookCategory(e.target.value);
  }

  const handleDescriptionInput = (e) => {
    setBookDescription(e.target.value);
  }

  //Handle onClick event
  const addNewTodo = () => {
    //Valid input value
    if (inputName.trim().length > 0 && inputPrice.trim().length > 0
      && inputCategory.trim().length > 0 && inputDescription.trim().length > 0) {
      setErrMsg('');
      let newTodoObject = {
        id: bookList.length + 1,
        name: inputName,
        price: inputPrice,
        category: inputCategory,
        description: inputDescription

      }
      //Add new todo item into List with the action
      dispatch({ type: 'ADD_TODO', payload: newTodoObject });
      //Empty input 
      setBookName('');
      setBookPrice('');
      setBookCategory('');
      setBookDescription('');
    }
    else {
      //Display Error message
      setErrMsg('Empty input');
    }
  }

  //Handle onClick event
  const editBook = () => {
    //Valid input value
    if (inputName.trim().length > 0 && inputPrice.trim().length > 0
      && inputCategory.trim().length > 0 && inputDescription.trim().length > 0) {
      setErrMsg('');
      /* let newTodoObject = {
        id: bookId,
        name: inputName,
        price: inputPrice,
        category: inputCategory,
        description: inputDescription

      } */
      bookList.filter(
        function (bookList) { return bookList.id === bookId })[0].name = inputName
      bookList.filter(
        function (bookList) { return bookList.id === bookId })[0].price = inputPrice
      bookList.filter(
        function (bookList) { return bookList.id === bookId })[0].category = inputCategory
      bookList.filter(
        function (bookList) { return bookList.id === bookId })[0].description = inputDescription

      //Add new todo item into List with the action
      /* dispatch({ type: 'ADD_TODO', payload: newTodoObject }); */
      //Empty input 
      setBookName('');
      setBookPrice('');
      setBookCategory('');
      setBookDescription('');
    }
    else {
      //Display Error message
      setErrMsg('Empty input');
    }
  }

  return (
    <section id="section-todo">
      <h3 className="center-align white-text blue">Book Store</h3>

      <button variant="primary" onClick={handleShow}>
        Add Book
      </button>


      <Modal className="Modal" isOpen={show}>

        <div className="row">
          <p className="red-text err-msg col s12 center-align">
            {errMsg}
          </p>
          <div className="input-field col s10">
            <div>
              Book Name:
            <input onChange={handleNameInput} value={inputName} placeholder="Add book name..." id="todo-input" type="text" />
            </div>
            <div>
              Book Price:
            <input onChange={handlePriceInput} value={inputPrice} placeholder="Add book price..." id="todo-input" type="text" />
            </div>
            <div>
              Book Category:
            <input onChange={handleCategoryInput} value={inputCategory} placeholder="Add book category..." id="todo-input" type="text" />
            </div>
            <div>
              Book Description:
              <input onChange={handleDescriptionInput} value={inputDescription} placeholder="Add book description..." id="todo-input" type="text" />
            </div>

          </div>
        </div>
        <button className="btn col s2 blue" onClick={addNewTodo} >Add Book</button>
        <button className="btn col s2 blue" onClick={handleClose} >Close</button>
      </Modal>

      <Modal className="Modal" isOpen={showEdit}>
        <div className="row">
          <p className="red-text err-msg col s12 center-align">
            {errMsg}
          </p>
          <div className="input-field col s10">
            <div>
              Book Name:
            <input onChange={handleNameInput} value={inputName} placeholder={bookName} id="todo-input" type="text" />
            </div>
            <div>
              Book Price:
            <input onChange={handlePriceInput} value={inputPrice} placeholder={bookPrice} id="todo-input" type="text" />
            </div>
            <div>
              Book Category:
            <input onChange={handleCategoryInput} value={inputCategory} placeholder={bookCategory} id="todo-input" type="text" />
            </div>
            <div>
              Book Description:
            <input onChange={handleDescriptionInput} value={inputDescription} placeholder={bookDescription} id="todo-input" type="text" />
            </div>
          </div>
        </div>
        <button className="btn col s2 blue" onClick={() => {editBook();handleEditClose();}} >Edit Book</button>
        <button className="btn col s2 blue" onClick={handleEditClose} >Close</button>
      </Modal>

      <thead>
        <tr>
          <th>Book Name</th>
          <th>Book Price</th>
          <th>Book Category</th>
        </tr>
      </thead>

      {
        bookList.length > 0 ?
          (<ul className="collection">
            {
              bookList.map(item => {
                return <div><button className="edit-btn" onClick={() => {
                  handleEditShow(); getBookId(item.id);
                  getBookName(item.name); getBookPrice(item.price); getBookCategory(item.category); getBookDescription(item.description); handleEdit(item.id);
                }}>Edit</button><BookItem key={item.id} item={item} /></div>
              })
            }
          </ul>) :
          (<p className="center-align">Book store is empty now.</p>)
      }


    </section>
  );
}

export default BookList;