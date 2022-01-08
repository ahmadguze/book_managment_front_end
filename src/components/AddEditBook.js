import { useState, useEffect } from 'react'
import Select from 'react-select';

import config from '../confg'
const url = config.BASE_URL;

const AddEditBook = ({text, onClick}) => {
    const [name, setName] = useState('')
    const [isbn, setIsbn] = useState('')
    const [author, setAuthor] = useState('')
    const [authors, setAuthors] = useState('')

    const fetchAuthors = async () => {
        const res = await fetch(`${url}/authors`)
        const data = await res.json()
        
        return data.map((author) => {
            
            return {label: author.first_name+' '+author.last_name,
             value: author._id}
         })
    }

    useEffect(() => {
        const getTasks = async () => {
            const authorFromServer = await fetchAuthors()
            setAuthors(authorFromServer)
        }
        getTasks()
    }, [])
    const getSelectedAuthor = (selectedAuthor) => {
        setAuthor(selectedAuthor)
    }
    const onSubmit = (e) =>{
        e.preventDefault()
        var book = {}
        if (name)
           book.name = name
        if(isbn)
          book.isbn = isbn
        if(author)
          book.author = author.value
        onClick(book)
        setAuthor('')
        setIsbn('')
        setName('')
    }
    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Name</label>
                <input
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Isbn</label>
                <input
                    type='number'
                    placeholder='Isbn'
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Author</label>
                <Select options={authors} value={author} onChange={getSelectedAuthor} className="custom_select"/>
            </div>
            <input type='submit' value={text} className='btn btn-block' />

        </form>
    )
}

export default AddEditBook
