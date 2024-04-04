import React from 'react';
import logo_transparent from '../assets/logo_transparent.png'; // Importez l'image

function Header() {
  return (
    <header className="App-header">
      <img src={logo_transparent} className="App-logo" alt="logo" /> 
    </header>
  );
}

export default Header;
