'use client';

import { useCaptureSpirit } from '@/features/captureSpirit/model/queries';
import { Button } from '@/shared/ui/Button/Button';

import styles from './CaptureButton.module.scss';

interface CaptureButtonProps {
   id: string;
   name: string;
   isCaptured: boolean;
}

export const CaptureButton = ({ id, name, isCaptured }: CaptureButtonProps) => {
   const mutation = useCaptureSpirit();
   const { mutate, isError, isPending } = mutation;

   return (
      <div className={styles.captureButtonWrapper}>
         <Button
            size="md"
            onClick={() => mutate(id)}
            isLoading={isPending && !isCaptured}
            disabled={isPending || isCaptured || isError}
            variant={isCaptured ? 'secondary' : 'primary'}
         >
            Capture
         </Button>

         <div className={`${styles.errorLabel} ${isError ? styles.visible : ''}`}>Error: {name} is too strong</div>
      </div>
   );
};
