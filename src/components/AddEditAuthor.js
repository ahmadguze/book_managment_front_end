import React from 'react'
import { useState } from 'react'

const AddEditAuthor = ({ text, addAuthor }) => {
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const onSubmit = (e) => {
        e.preventDefault()
        addAuthor({ first_name, last_name })
        setFirst_name('')
        setLast_name('')

    }
    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>First Name</label>
                <input
                    type='text'
                    placeholder='First name'
                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Last Name</label>
                <input
                    type='text'
                    placeholder='Last name'
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                />
            </div>
            <input type='submit' value={text} className='btn btn-block' />

        </form>
    )
}

export default AddEditAuthor;
