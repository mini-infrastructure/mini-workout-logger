import type { PropsWithChildren } from 'react';
import Card, { type CardProps } from '../Card/index';
import BlobGlassBackground from '../BlobGlassBackground/index.tsx';
import { floatAnimation } from '../BlobGlassBackground/index.style.tsx';
import styles from './index.style.tsx';

const BlobCard = ({ children }: PropsWithChildren<CardProps>) => (
    <Card customCss={styles.blobCard}>
        <BlobGlassBackground color="var(--color-blue)" animation={floatAnimation} />
        {children}
    </Card>
);

export default BlobCard;
