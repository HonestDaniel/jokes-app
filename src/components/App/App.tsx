import React from 'react';
import './App.scss';
import JokesList from '../JokesList/JokesList';

const App: React.FC = () => {
  return (
      <div className='wrapper'>
        <JokesList />
      </div>
  );
};

export default App;