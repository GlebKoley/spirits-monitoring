'use client';

import { useCaptureSpirit } from '@/features/captureSpirit/model/useCaptureSpirit';
import { Button } from '@/shared/ui/Button/Button';

import styles from './CaptureButton.module.scss';

interface CaptureButtonProps {
   id: string;
   name: string;
   isCaptured: boolean;
}

export const CaptureButton = ({ id, name, isCaptured }: CaptureButtonProps) => {
   const { mutate, isError } = useCaptureSpirit();

   return (
      <div className={styles.captureButtonWrapper}>
         <Button
            size="md"
            disabled={isCaptured}
            onClick={() => mutate(id)}
            variant={isCaptured ? 'secondary' : 'primary'}
         >
            Capture
         </Button>

         <div className={`${styles.errorLabel} ${isError ? styles.visible : ''}`}>Error: {name} is too strong</div>
      </div>
   );
};
