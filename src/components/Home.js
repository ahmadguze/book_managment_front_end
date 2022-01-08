import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='container home'>
            <Link to="/books">
                <button className='home-btn btn'>Books</button>
            </Link>
            <Link to="/authors">
                <button className='home-btn btn' >Authors</button>
            </Link>
        </div>
    )
}

export default Home
