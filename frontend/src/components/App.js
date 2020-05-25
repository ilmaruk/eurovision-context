import React from 'react';
import Header from './Header'
import '../styles/main.scss';
import Table from './Table'

function App() {
  return (
    <div className="app">
      <Header/>
        <div className="container">
            <Table />
        </div>
    </div>
  );
}

export default App;
