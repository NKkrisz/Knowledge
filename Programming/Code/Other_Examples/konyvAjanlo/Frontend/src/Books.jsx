import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getData } from './utils'
import { FaHome } from 'react-icons/fa'

const Books = () => {
  const navigate = useNavigate();

  const {category, searchQuery} = useParams()
  
  const [errorState, setErrorState] = useState("")

  errorState && console.log(errorState);

  const [books, setBooks] = useState([])
  
  useEffect(()=>{
    if(category){
      getData("http://localhost:8000/api/books/"+category, setBooks)
    } else if (searchQuery) {
      getData("http://localhost:8000/api/book/"+searchQuery, setBooks, setErrorState)
    }
  }, [])
  
  searchQuery && console.log(searchQuery);
  category && console.log(category);

  books && console.log(books);

  return (
    <>
      <button id='GoHomeButton' onClick={()=>navigate("/")}><FaHome/></button>
      <div id="Books">
        {books && books.map((book)=>
          <div className="Book" key={book.title}>
            <div className='BookImage'>
              <img src={book.cover} alt={book.title} />
            </div>
            <div className="BookDetail">
              <h2>{book.title}</h2>
              <p className='author'><b>{book.author}</b></p>
              <p className='type'>{book.name}</p>
              <p className='description'>{book.description}</p>
              <p className='rating'>Rating: {"⭐".repeat(Math.floor(book.rating))}</p>
            </div>
          </div>
        )}
        {errorState && 
          <p>{errorState}</p>
        }
      </div>
    </>
  )
}

export default Books
