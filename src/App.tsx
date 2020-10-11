import React from 'react';
import styles from './App.module.scss';

import Navbar from 'components/Navbar/Navbar';

function App() {
  return (
    <div className={styles.Grid}>
      <Navbar />
    </div>
  );
}

export default App;
