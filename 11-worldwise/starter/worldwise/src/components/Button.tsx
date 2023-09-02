import styles from './Button.module.css';

import { ReactNode } from 'react';

function Button({
  type,
  onClick,
  children,
}: {
  type: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: ReactNode;
}) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
