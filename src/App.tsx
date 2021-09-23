import React from 'react';
import { Router } from '@reach/router'
import './App.css';

import { StudentEdit } from './StudentEdit'
import { GridPagination } from './GridPagination';

function App() {
  return (
      <Router>
          <GridPagination url={'http://localhost:8080/v1/alunos/'} path='/'/>
          <StudentEdit path='/StudentEdit/:action' />
          <StudentEdit path='/StudentEdit/:action/:id' />
      </Router>
  );
}

export default App;
