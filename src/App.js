import React, { useState,useEffect } from 'react'
import {Route,Routes, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ShelfTitle from './ShelfTitle'
import BooksShelf from './BookShelf'

import './App.css'

const BooksApp =()=>{

  let [books,setBooks]=useState([]);
  let [flip,setFlip]=useState(true);

  useEffect( ()=>{
    BooksAPI.getAll().then((books)=>{setBooks(books)})
  },[]);

const updateShelf =(book,shelf)=>{
  const updateIndex = books.findIndex((b)=> b.id === book.id)
  const updatedBookList = books;

  if(updateIndex === -1)
    {
      book.shelf = shelf;
      updatedBookList.push(book)
    }else
    {
      updatedBookList[updateIndex].shelf=shelf
    }

    setBooks(updatedBookList);

    BooksAPI.update(book,shelf);
    setFlip(!flip)

}


  // state = {
  //   /**
  //    * TODO: Instead of using this state variable to keep track of which page
  //    * we're on, use the URL in the browser's address bar. This will ensure that
  //    * users can use the browser's back and forward buttons to navigate between
  //    * pages, as well as provide a good URL they can bookmark and share.
  //    */
  //   showSearchPage: false
  // }

  return (
      <div className="app">
                 
<Routes>
           <Route path='/search' 
            render={()=>(
            <SearchBooks  storedBooks={books} onUpdateShelf={updateShelf} />
           )} />

           <Route exact path='/'
           render={()=>(
            
        <div className="list-books">\
            <ShelfTitle />
            <div className="list-books-content">
              <div>
                <BooksShelf 
                 className="bookshelf" title="Currently Reading"
                 books={books.filter((book) => book.shelf="currentlyReading") }
                 updateShelf={updateShelf} />

                <BooksShelf 
                 className="bookshelf" title="Want to Read"
                 books={books.filter((book) => book.shelf="wantToRead") }
                 updateShelf={updateShelf} />

                <BooksShelf 
                 className="bookshelf" title="Read"
                 books={books.filter((book) => book.shelf="read") }
                 updateShelf={updateShelf} />

              </div>
            </div>
            </div>
           ) } />
</Routes>
          
          
            <div className="open-search">
            <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}

export default BooksApp
