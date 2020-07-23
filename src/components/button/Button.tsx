import React from 'react';
import './Button.scss';
import { CellState, CellValue } from '../../utils/types';

interface IButtonProps{
    row: number;
    col: number;
    state: CellState;
    value: CellValue;
    onClick(rowParam: number, colParam: number): (e: React.MouseEvent) => void;
    onContext(rowParam: number, colParam: number): (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    red?: boolean;
}

export const Button: React.FC<IButtonProps> = ({ row, col, state, value, onClick, onContext, red }) => {
    const renderContent =(): React.ReactNode => {
        if(state === CellState.visible){
            if(value === CellValue.bomb){
                return <span role='img' aria-label='bomb'>💣</span>
            }
            return value;
        }else if (state === CellState.flagged){
            return <span role='img' aria-label='bomb'>🚩</span>
        }
        return null;
    }

    return (
        <div 
            className={`button ${state === CellState.visible ? 'visible' : ''} value-${value} ${red ? 'red' : ''}`}
            onClick={onClick(row, col)}
            onContextMenu={onContext(row, col)}
        >
            {renderContent()}
        </div>
    )
}