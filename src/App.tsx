import React, { useState } from 'react';
import './App.scss';
import { NumberDisplay } from './components/NumberDisplay/NumberDisplay';
import { generateCells } from './utils';
import { Button } from './components/button/Button';

const App: React.FC = () => {
  const [cells, setCells] = useState(generateCells());

  console.log('cells',cells)
  const renderCells = ():React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => <Button key={`${rowIndex}-${colIndex}`} state={cell.state} value={cell.value} row={rowIndex} col={colIndex}/>))
  }

  return (
    <div className='App'>
      <div className='header'>
        <NumberDisplay value={0} />
        <div className='face'>
          <span role='img' aria-label='face'>😬</span>
        </div>
        <NumberDisplay value={23} />
      </div>
      <div className='body'>{renderCells()}</div>
    </div>
  );
}

export default App;
