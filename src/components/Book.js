import React from 'react'

const Book = (props) => {
  const book = props.book
  const nameOfBook = props.name
  return (
    <div className="details">
      {nameOfBook !== "" ? (<div> <span style={{ fontWeight: 'bold' }}> Name:</span><span>{nameOfBook}</span></div>) : ""}
      <div><span style={{ fontWeight: 'bold' }}> Isbn: </span> <span>{book.isbn}</span></div>
      {book.author?(<div>
        <span style={{ fontWeight: 'bold' }}> Author: </span>
        <span>
          {`${book.author.first_name} ${book.author.last_name}`}
        </span>
      </div>):''}
    </div>
  )

}
Book.defaultProps = {
  name: "",
}
export default Book
