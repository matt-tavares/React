import React from 'react';
import './App.css';

import { GridPagination } from './GridPagination';

function App() {
  return (
  <div className='container'>
    <GridPagination url={'http://localhost:8080/aluno/'}/>
  </div>
  );
}

export default App;
