import React from 'react'
import { Link } from 'react-router-dom'

const Back = () => {
    return (
        <Link to='/'>
            <button className="btn back">
                back
            </button>
        </Link>
    )
}

export default Back
