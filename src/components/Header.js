import React from 'react'
import Button from './Button'

const Header = ({title, showAdd, onClickAdd}) => {
    return (
        <header className="header">
            <h1>{title}</h1>
            <Button text= {!showAdd?"Add":"close"}  color={!showAdd?"green":"red"} onClickAdd={onClickAdd}/>
        </header>
    )
}

export default Header
