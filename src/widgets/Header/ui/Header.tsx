import { Spirit } from '@/entities/spirit/model/types';

import styles from './Header.module.scss';

const Header = ({ data }: { data: Spirit[] }) => {
   const notCapturedSpirits = data.filter((spirit) => spirit.status === 'Active');

   const isAllCaptured = notCapturedSpirits.length === 0;
   return (
      <header className={styles.header}>
         <h1>{isAllCaptured ? 'All the spirits are captured' : 'Uncaptured spirits:'}</h1>
         <div className={styles.spiritsNamesHeaderList}>
            {notCapturedSpirits.map((spirit) => (
               <span key={spirit.id}>{spirit.name}</span>
            ))}
         </div>
      </header>
   );
};

export default Header;
