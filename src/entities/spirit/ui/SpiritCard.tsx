import { Spirit } from '@/entities/spirit/model/types';
import { CaptureButton } from '@/features/captureSpirit/ui/CaptureButton';

import styles from './SpiritCard.module.scss';

const SpiritCard = ({ data }: { data: Spirit }) => {
   const { name, status, location, threatLevel } = data;

   const details = [
      { value: location, label: 'Location' },
      { value: status, label: 'Status' },
      { value: threatLevel, label: 'Threat level' },
   ];

   return (
      <div className={`${styles.spiritCard} ${status === 'Captured' ? styles['-captured'] : ''}`}>
         <div className={styles.spiritName}>{name}</div>

         <div className={styles.spiritDetails}>
            {details.map(({ label, value }) => (
               <div key={label} className={styles.detail}>
                  <span>{label}: </span>
                  {value}
               </div>
            ))}
         </div>

         {status === 'Active' && <div className={`${styles['threat-dot']} ${styles[threatLevel.toLowerCase()]}`} />}

         <CaptureButton name={name} id={data.id} isCaptured={status === 'Captured'} />
      </div>
   );
};

export default SpiritCard;
