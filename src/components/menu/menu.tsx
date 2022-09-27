import React, { FC } from 'react';
import styles from './menu.module.css';

interface MenuProps {}

const Menu: FC<MenuProps> = () => (
  <div className={styles.Menu} data-testid="Menu">
    Menu Component
  </div>
);

export default Menu;
