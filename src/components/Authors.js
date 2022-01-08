import { useEffect, useState } from 'react'
import Header from './Header'
import Item from './Item'
import Author from './Author'
import AddEditAuthor from './AddEditAuthor'
import config from '../confg'

const url = config.BASE_URL
const Authors = () => {
    const [authors, setAuthors] = useState([])
    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [itemId, setItemId] = useState([])

    useEffect(() => {
        const getAuthors = async () => {
            const authorsFromServer = await fetchAuthors()
            setAuthors(authorsFromServer)
        }
        getAuthors()
    }, [])

    const fetchAuthors = async () =>  (await fetch(`${url}/authors`)).json()

    const addAuthor = async (author) => {
        var res = await fetch(`${url}/author`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(author)
        })
        var resData = await res.json()
        if (res.status === 400)
           alert(`creation of the book faild because of ${resData.message}`)

        const data = await fetchAuthors()
        setAuthors(data)
    }

    const editAuthor = async (book) => {
        var res = await fetch(`${url}/author/${itemId}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(book)
        })
        
        if (res.status === 404)
            alert("Author not found")
        if (res.status === 400)
            alert("please enter valid data")
        const data = await fetchAuthors()
        setAuthors(data)
    }

    const deleteAuthor = async (e, id) => {
        e.stopPropagation();
        if (itemId === id)
            setShowEdit(false)
        var res = await fetch(`${url}/author/${id}`, {
            method: "Delete"
        })
        if (res.status === 400)
            alert("author not found")
        if (res.status === 404)
            alert("Delete the author faild")
        setAuthors(authors.filter((author) => author._id !== id))
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



    const component = (books) => (<Author books={books} />)
    return (
        <div className="container">
            <Header onClickAdd={onClickAdd} showAdd={showAdd} title="Authors" />
            {showAdd || showEdit ? <AddEditAuthor text={showAdd ? "Add Author" : showEdit ? "Edit Author" : ''} addAuthor={showAdd ? addAuthor : showEdit ? editAuthor : ''} /> : ''}
            {authors.length === 0 ? "No authors to show" : ''}
            {
                authors.map((author) => {
                    return (<Item onClickEdit={onClickEdit} onDelete={deleteAuthor} key={author._id} itemId={author._id} name={`${author.first_name} ${author.last_name}`}
                        component={component} />)
                }
                )
            }
        </div>
    )
}

export default Authors
