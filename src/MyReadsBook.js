import React from 'react'
import PropTypes from 'prop-types'
import MyReadsShelfChanger from './MyReadsShelfChanger'

const MyReadsBook = (props)=>{

  MyReadsBook.protoTypes={
        onUpdateShelf:PropTypes.func.isRequired,
        bookItem:PropTypes.object.isRequired
    }

    return ( 
         <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" 
            style={{ width: 128, height: 193, 
            backgroundImage: ((props.bookItem.imageLinks && props.bookItem.imageLinks.smallThumbnail)?`url(${props.bookItem.imageLinks.smallThumbnail})`:"none" )}}>

            </div>
            <MyReadsShelfChanger 
             onUpdateShelf={props.onUpdateShelf}
             bookItem={props.bookItem}
             shelf={props.bookItem.shelf}
             />
          </div>

          <div className="book-title">{props.bookItem.title}</div>
          <div className="book-authors">{(props.bookItem.authors && props.bookItem.authors.length > 1) ? props.bookItem.authors.join(", "):props.bookItem.authors}</div>
        </div>
      </li>
      )
}

export default MyReadsBook;