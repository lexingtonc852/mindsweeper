import React from 'react';
import './NumberDisplay.scss'

interface INumberDisplayProps{
    value: number;
}

export const NumberDisplay: React.FC <INumberDisplayProps> = ({ value }) => {
    return(
        <div className='number-display'>{value.toString().padStart(3, '0')}</div>
    )
}