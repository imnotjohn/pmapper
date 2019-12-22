import React from 'react';
import logo from './logo.svg';
import './App.css';

import Input from './components/Input/Input';

function App() {
  return (
    <div className="App">

      <Input inputTitle="Foreground" />
      <Input inputTitle="Background" />

    </div>
  );
}

export default App;
