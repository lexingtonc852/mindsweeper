import React from 'react';
import './NumberDisplay.scss'

interface INumberDisplayProps{
    value: number;
}

export function NumberDisplay(props:INumberDisplayProps){
    return(
        <div className='number-display'>{props.value.toString().padStart(3, '0')}</div>
    )
}