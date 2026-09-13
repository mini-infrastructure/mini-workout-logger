import type { ReactNode } from 'react';
import IconButton from '../IconButton';
import styles from './index.style';

type ActionCardProps = {
    title: string;
    icon: ReactNode;
    onClick: () => void;
};

const ActionCard = ({
    title,
    icon,
    onClick,
}: ActionCardProps) => {
    return (
        <div css={styles.card} onClick={onClick}>
            <h3 css={styles.title}>{title}</h3>
            <IconButton
                icon={icon}
                size="lg"
                customCss={styles.iconButtonOverride}
            />
        </div>
    );
};

export default ActionCard;
