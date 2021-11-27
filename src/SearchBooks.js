import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import Book from './Book'

const SearchBooks = (props)=>{

    SearchBooks.propTypes={
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
             })
    }

return(
    <div className="search-books">
            <div className="search-books-bar">
             <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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