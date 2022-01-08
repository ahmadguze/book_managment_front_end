import { useState, useEffect } from 'react'
import { FaEdit, FaTimes } from 'react-icons/fa'

import config from '../confg'
const url = config.BASE_URL;

const Item = ({onClickEdit, onDelete, itemId, name, component}) => {
    const [show, setShow] = useState()
    const [books, setBooks] = useState([]) 
    const fetchBooksForAuthor = async (id) => {
        const res = await fetch(`${url}/books/author/${id}`)
        const data = res.json() 
        return data
    }
    useEffect(()=>{
        const getBooks = async() =>{
            const books = await fetchBooksForAuthor(itemId)
            setBooks(books)
        }

        getBooks()

    }, [])
    const showDetails = () => {
        setShow(!show)
   }
    return (
        <div  className="item">
           <h3 onClick = {showDetails}><span style={{width:'100%'}}>{name}</span><FaEdit onClick={(e) => onClickEdit(itemId, e)}/>
           <FaTimes onClick={(e) => onDelete(e, itemId)}/></h3>
           {show?component(books):''}
        </div>
    )
}

export default Item
