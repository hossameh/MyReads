import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import Book from './Book'

const SearchBooks = (props)=>{

    SearchBooks.PropTypes={
        storedBooks: PropTypes.array.isRequired,
        onUpdateShelf:PropTypes.func.isRequired
    }

    let [query,setQuery] = useState("");
    let [searchedBooks,setSearchedBooks] = useState([]);

    const updateQuery= (query)=>{
        setQuery(query);

        BooksAPI.search(query).then(
            (rslt)=> {
                if(rslt && rslt.length > 0)
                {
                    for(let i=0;i<rslt.length;i++)
                    {
                        for(let j=0;j<props.storedBooks.length;j++)
                        {
                            if(rslt[i].id === props.storedBooks[j].id)
                            {
                                const shelfedBookIndex = props.storedBooks.findIndex((book)=> book.id === rslt[i].id)
                                rslt[i].shelf= props.storedBooks[shelfedBookIndex].shelf
                            }
                        }
                    }
                }
                setSearchedBooks(rslt);
             })
    }

return(
    <div className="search-books">
            <div className="search-books-bar">
             <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                
                <input type="text" placeholder="Search by title or author"
                value={query}
                onChange={(evt)=>updateQuery(evt.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {searchedBooks && searchedBooks.length > 0 
                && searchedBooks.map((book)=> (<Book key={book.id} onUpdateShelf={props.onUpdateShelf} bookItem={book} />))
            }
              </ol>
            </div>
          </div>
        )

}
export default SearchBooks;