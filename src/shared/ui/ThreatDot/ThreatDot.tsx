import { ThreatLevel } from '@/entities/spirit/model/types';

import styles from './ThreatDot.module.scss';

const ThreatDot = ({ threatLevel }: { threatLevel: keyof typeof ThreatLevel }) => {
   return <div className={`${styles['threat-dot']} ${styles[threatLevel]}`} />;
};

export default ThreatDot;
