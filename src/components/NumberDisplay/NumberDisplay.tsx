import React from 'react';
import './NumberDisplay.scss'

interface INumberDisplayProps{
    value: number;
}

export const NumberDisplay: React.FC <INumberDisplayProps> = ({ value }) => {
    return(
        <div className='number-display'>
            {value < 0 
                ? `-${Math.abs(value).toString().padStart(2, '0')}` 
                : value.toString().padStart(3, '0')
            }
        </div>
    )
}