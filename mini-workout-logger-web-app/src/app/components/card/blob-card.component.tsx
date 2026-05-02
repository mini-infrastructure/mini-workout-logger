import type { PropsWithChildren } from 'react';
import Card, { type CardProps } from './card.component';
import BlobGlassBackground from '../background/blob-glass/blob-glass.component.tsx';
import { floatAnimation } from '../background/blob-glass/blob-glass.component.style.tsx';
import styles from './blob-card.component.style.tsx';

const BlobCard = ({ children }: PropsWithChildren<CardProps>) => (
    <Card customCss={styles.blobCard}>
        <BlobGlassBackground color="var(--color-blue)" animation={floatAnimation} />
        {children}
    </Card>
);

export default BlobCard;
