import React, { useState, useEffect } from 'react';
import './App.scss';
import { NumberDisplay } from './components/NumberDisplay/NumberDisplay';
import { generateCells, openMultipleCells } from './utils';
import { Button } from './components/button/Button';
import { Face, Cell, CellState, CellValue } from './utils/types';
import { MAX_ROWS, MAX_COLS} from './utils/index'

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [face, setFace] = useState<Face>(Face.smile);
  const [time, setTime] = useState<number>(0);
  const [live, setLive] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState<number>(10);
  const [hasLost, setHasLost] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);

  useEffect(()=> {
    const handleMousedown = ():void => {
      setFace(Face.oh);
    }

    const handleMouseUp = ():void => {
      setFace(Face.smile);
    }

    window.addEventListener('mousedown', handleMousedown);
    window.addEventListener('mouseup', handleMouseUp);

    // ComponentWillUnmount
    return () => {
      window.removeEventListener('mousedown', handleMousedown);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  },[]);

  useEffect(()=> {
    if (live && time < 999){
     const timer = setInterval(()=>{
       setTime(time + 1)
     },1000);
     
     return () => {
      clearInterval(timer)
     }
    }
  },[live,time])

  useEffect(()=>{
    if(hasLost){
      setFace(Face.lost)
      setLive(false)
    }
  },[hasLost,time])

  useEffect(()=>{
    if(hasWon){
      setLive(false);
      setFace(Face.won);
    }
  },[hasWon])
  
  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    let newCells = cells.slice();
    
    if(!live){
      let isBomb = newCells[rowParam][colParam].value === CellValue.bomb
      while(isBomb){
        newCells = generateCells();
        
        if(newCells[rowParam][colParam].value !== CellValue.bomb){
          isBomb = false;
          break;
        }
      }
      setLive(true);
    }
    
    const currentCell = newCells[rowParam][colParam];

    if(currentCell.state === CellState.flagged || currentCell.state === CellState.visible){
      return;
    }
    if(!hasLost && currentCell.value === CellValue.bomb){
      setHasLost(true);
      setLive(false);
      newCells[rowParam][colParam].red = true;
      newCells = showAllBombs()
      setCells(newCells);
      return;
    }else if (!hasLost && currentCell.value === CellValue.none){
      newCells = openMultipleCells(newCells, rowParam, colParam);
    }else if (!hasLost) {
      newCells[rowParam][colParam].state = CellState.visible;
    }

    // Check to see if you have won
    let safeOpenCellsExists = false;
    for (let row = 0; row < MAX_ROWS; row++){
      for (let col = 0; col < MAX_COLS; col++){
        const currentCell = newCells[row][col];

        if(currentCell.value !== CellValue.bomb && currentCell.state === CellState.open){
          safeOpenCellsExists = true;
          break
        }
      }
    }
    if(!safeOpenCellsExists){
      newCells = newCells.map(row => row.map(cell => {
        if(cell.value === CellValue.bomb){
          return{
            ...cell,
            state: CellState.flagged
          }
        }
        return cell;
      }))
      setHasWon(true);
    }
  }

  const handleCellContext = (rowParam: number, colParam: number) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      e.preventDefault();

      if(!live){
        return;
      }

      const currentCells = cells.slice();
      const currentCell = cells[rowParam][colParam];

      if(currentCell.state === CellState.visible){
        return;
      }else if (currentCell.state === CellState.open){
        currentCells[rowParam][colParam].state = CellState.flagged;
        setCells(currentCells);
        setBombCounter(bombCounter - 1);
      }else if (currentCell.state === CellState.flagged){
        currentCells[rowParam][colParam].state = CellState.open;
        setBombCounter(bombCounter + 1);
      }
  }

  const handleFaceClick = ():void => {
    setLive(false);
    setTime(0);
    setCells(generateCells());
    setBombCounter(10);
    setHasLost(false);
    setHasWon(false);
  }

  const renderCells = ():React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          key={`${rowIndex}-${colIndex}`}
          state={cell.state} 
          value={cell.value}
          row={rowIndex}
          col={colIndex}
          onClick={handleCellClick}
          onContext={handleCellContext}
          red={cell.red}
        />
      ))
    )
  }

  const showAllBombs = ():Cell[][] => {
    const currentCells = cells.slice();
    return currentCells.map(row => row.map(cell => {
      if(cell.value === CellValue.bomb){
        return{
          ...cell,
          state: CellState.visible
        }
      }
      return cell;
    }))
  }

  return (
    <div className='App'>
      <div className='header'>
        <NumberDisplay value={bombCounter} />
        <div className='face' onClick={handleFaceClick} >
          <span role='img' aria-label='face'>{face}</span>
        </div>
        <NumberDisplay value={time} />
      </div>
      <div className='body'>{renderCells()}</div>
    </div>
  );
}

export default App;
