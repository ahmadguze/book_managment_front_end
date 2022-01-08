import React from 'react'
import Book from './Book'

const Author = ({books}) => {
    return (
        <>
         <h3 style={{marginLeft: '10px'}}>{ books.length === 0? "There is no books for this Author" :"Books"}</h3> 
         {
        books.map((book)=> {
        book = {name:book.name, isbn: book.isbn}
         return (
        <div className="details">
         <Book name = {book.name} book ={book}/>
         </div>    
         )                          
         }
         )
        }
        </>
    )
}

export default Author
