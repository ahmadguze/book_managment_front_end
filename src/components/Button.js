import React from 'react'

const Button = ({color, text, onClickAdd}) => {
    return (
        <button onClick = {onClickAdd} style={{backgroundColor: color}} className="btn">
            {text}
        </button>
    )
}

export default Button
