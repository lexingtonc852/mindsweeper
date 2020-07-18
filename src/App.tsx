import React from 'react';
import './App.scss';
import { NumberDisplay } from './components/NumberDisplay/NumberDisplay';

function App() {
  return (
    <div className='App'>
      <div className='header'>
        <NumberDisplay value={0} />
        <div className='face'>
          <span role='img' aria-label='face'>😬</span>
        </div>
        <NumberDisplay value={23} />
      </div>
      <div className='body'>Body</div>
    </div>
  );
}

export default App;
