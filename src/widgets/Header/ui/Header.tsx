import React from 'react';

import { Spirit } from '@/entities/spirit/model/types';

import styles from './Header.module.scss';

const Header = ({ data }: { data: Spirit[] }) => {
   const notCapturedSpirits = data.filter((spirit) => spirit.status === 'Active');

   return (
      <header className={styles.header}>
         <h1>{notCapturedSpirits.length === 0 ? 'All spirits captured' : 'Spirits not captured:'}</h1>
         <div className={styles.spiritsNamesHeaderList}>
            {notCapturedSpirits.map((spirit) => (
               <span key={spirit.id}>{spirit.name}</span>
            ))}
         </div>
      </header>
   );
};

export default Header;
