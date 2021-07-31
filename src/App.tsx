import React from 'react';
import './App.css';

import { Grid } from './Grid';

function App() {
  return (
  <div>
    <p className='title'>Tabela 'aluno' acessado no localhost</p>
    <Grid url={'http://localhost:8080/aluno/'}/>
  </div>
  );
}

export default App;
