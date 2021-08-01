import React from 'react';
import './App.css';

import { Grid } from './Grid';

function App() {
  return (
  <div className='container'>
    <Grid url={'http://localhost:8080/aluno/'}/>
  </div>
  );
}

export default App;
