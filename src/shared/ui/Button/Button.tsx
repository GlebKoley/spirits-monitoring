import { ButtonHTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: 'primary' | 'secondary' | 'danger';
   size?: 'sm' | 'md';
   isLoading?: boolean;
   children: ReactNode;
}

export const Button = ({
   children,
   disabled,
   className,
   isLoading,
   size = 'sm',
   variant = 'primary',
   ...props
}: ButtonProps) => {
   return (
      <button
         disabled={disabled || isLoading}
         className={clsx(styles.button, styles[variant], styles[size], className)}
         {...props}
      >
         {isLoading ? <span className={styles.loader}>...</span> : children}
      </button>
   );
};
