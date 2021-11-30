import React from 'react'
import PropTypes from 'prop-types'
import Book from './MyReadsBook'


const MyReadsShelf = (props)=>{

  MyReadsShelf.propTypes={
        title:PropTypes.string.isRequired,
        myReadsBooks:PropTypes.array.isRequired,
        updateShelf:PropTypes.func.isRequired
    }

    return (
    
        <div className="bookshelf">
                  <h2 className="bookshelf-title">{props.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {props.myReadsBooks.map((book)=>
                         <Book key={book.id}
                         onUpdateShelf={props.updateShelf}
                         bookItem={book}
                         />)}
                    </ol>
                  </div>
                </div>
    )
}

export default MyReadsShelf