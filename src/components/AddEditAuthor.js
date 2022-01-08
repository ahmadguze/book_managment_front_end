import React from 'react'
import { useState } from 'react'

const AddEditAuthor = ({ text, onClick }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        var author = {}
        if (firstName)
            author.first_name = firstName
        if (lastName)
            author.last_name = lastName
        var result = await onClick(author)
        if (result) {
            setFirstName('')
            setLastName('')
        }

    }
    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>First Name</label>
                <input
                    type='text'
                    placeholder='First name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Last Name</label>
                <input
                    type='text'
                    placeholder='Last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <input type='submit' value={text} className='btn btn-block' />

        </form>
    )
}

export default AddEditAuthor;
