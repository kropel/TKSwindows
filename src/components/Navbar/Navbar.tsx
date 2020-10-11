import React from 'react';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Navbar}>
        <div className={styles.Logo}>
          <img
            src="http://tksbuilding.co.uk/img/TKS_builder_company.png"
            alt=""
          />
        </div>
        <ul className={styles.Menu}>
          <li className={styles.Link}>Windows</li>
          <li className={styles.Link}>Link 2</li>
          <li className={styles.Link}>Link 3</li>
          <li className={styles.Link}>Link 4</li>
        </ul>
        <div className={styles.CallButton}>
          <span>+44 222 111 999</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
