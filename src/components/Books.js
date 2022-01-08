import React from 'react'
import Header from './Header'
import { useState, useEffect } from 'react'
import Item from './Item'
import Book from './Book'
import AddEditBook from './AddEditBook'
import config from '../confg'

const url = config.BASE_URL;
const Books = () => {
    const [books, setBooks] = useState([])
    const [itemId, setItemId] = useState([])
    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    
    useEffect(() => {
        const getBooks = async () => {
            const booksFromServer = await fetchBooks()
            setBooks(booksFromServer)
        }
        getBooks()
    }, [])

    const fetchBooks = async () =>  (await fetch(`${url}/books`)).json()

    const addBook = async (book) => {
        var res = await fetch(`${url}/book`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(book)
        })
        var resData = await res.json()
        if (res.status === 400)
            alert(`creation of the book faild because of ${resData.message}`)

        const data = await fetchBooks()
        setBooks(data)
    }

    const editBook = async (book) => {
        var res = await fetch(`${url}/book/${itemId}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(book)
        })

        if (res.status === 404)
            alert("Book not found")
        if (res.status === 400)
            alert("please enter valid data")
        const data = await fetchBooks()
        setBooks(data)
    }

    const deleteBook = async (e, id) => {
        e.stopPropagation();
        if (itemId === id)
            setShowEdit(false)
        var res = await fetch(`${url}/book/${id}`, {
            method: "Delete"
        })
        if (res.status === 400)
            alert("book not found")
        if (res.status === 404)
            alert("Delete the book faild")
        setBooks(books.filter((book) => book._id !== id))
    }

    const onClickAdd = () => {
        setShowEdit(false)
        setShowAdd(!showAdd)
    }

    const onClickEdit = (itemId_, e) => {
        e.stopPropagation()
        setItemId(itemId_)
        setShowAdd(false)
        setShowEdit(!showEdit)
    }

    return (
        <div className="container">
            <Header onClickAdd={onClickAdd} showAdd={showAdd} title="Books" />
            {showAdd || showEdit ? <AddEditBook text={showAdd ? "Add book" : showEdit ? "Edit book" : ''} onClick={showAdd ? addBook : showEdit ? editBook : ''} /> : ''}
            {books.length === 0 ? "No books to show" : ''}
            {
                books.map((book) => {
                    const component = () => (<Book book={book} />)
                    return (<Item onClickEdit={onClickEdit} onDelete={deleteBook} key={book._id} itemId={book._id} name={book.name} component={component} />);
                }
                )
            }
        </div>
    )
}

export default Books
