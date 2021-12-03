import React, { useState,useEffect } from 'react'
import {Route,Switch, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import MyReadsSearch from './MyReadsSearch'
import MyReadsShelf from './MyReadsShelf'

import './App.css'

const BooksApp =()=>{

  let [myReadsBooks,myReadsSetBooks]=useState([]);
  let [myReadsFlip,myReadsSetFlip]=useState(true);

  useEffect( 
    ()=>{
    BooksAPI.getAll().then((myReadsBooks)=>
    {myReadsSetBooks(myReadsBooks)})
  },[]);

const updateShelf =(book,shelf)=>{
  const updateIndex = myReadsBooks.findIndex((b)=> b.id === book.id)
  const updatedBookList = myReadsBooks;

  if(updateIndex === -1)
    {
      book.shelf = shelf
      updatedBookList.push(book)
    }else
    {
      updatedBookList[updateIndex].shelf=shelf
    }

    myReadsSetBooks(updatedBookList);

    BooksAPI.update(book,shelf);
    myReadsSetFlip(!myReadsFlip)

}

  return (
      <div className="app">
     <Switch>
           <Route path='/search' 
            render={()=>(
            <MyReadsSearch  storedBooks={myReadsBooks} onUpdateShelf={updateShelf} />
           )} />

           <Route exact path='/'
           render={()=>(
            
        <div className="list-books">
           <div className="list-books-title">
            <h1>My Reads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <MyReadsShelf 
                 className="bookshelf" title="Currently Reading"
                 myReadsBooks={myReadsBooks.filter((book) => book.shelf==="currentlyReading") }
                 updateShelf={updateShelf} />

                <MyReadsShelf 
                 className="bookshelf" title="Want to Read"
                 myReadsBooks={myReadsBooks.filter((book) => book.shelf==="wantToRead") }
                 updateShelf={updateShelf} />

                <MyReadsShelf 
                 className="bookshelf" title="Read"
                 myReadsBooks={myReadsBooks.filter((book) => book.shelf==="read") }
                 updateShelf={updateShelf} />

              </div>
            </div>
            <div className="open-search">
            <Link to="/search">Add a book</Link>
            </div>
            </div>
           ) } /> 
     </Switch>
      </div>
        )}

export default BooksApp
