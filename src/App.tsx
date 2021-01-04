import React from 'react';
import './App.css';
import { Layout } from './components/Layout/Layout';
import { BrowserRouter as Router } from 'react-router-dom';

import Drawer from './components/Drawer/Drawer';
import ColorPicker from './components/ColorPicker/ColorPicker';

function App() {
  return (
    <>
      <Router basename="/tkswindowsanddoors">
        <Layout />
      </Router>
      <div style={{ position: 'absolute', top: 280, zIndex: 999999 }}>
        <ColorPicker />
      </div>
    </>
  );
}

export default App;
