import { ButtonHTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: 'primary' | 'secondary';
   size?: 'sm' | 'md';
   children: ReactNode;
}

export const Button = ({ children, disabled, className, size = 'sm', variant = 'primary', ...props }: ButtonProps) => {
   return (
      <button disabled={disabled} className={clsx(styles.button, styles[variant], styles[size], className)} {...props}>
         {children}
      </button>
   );
};
