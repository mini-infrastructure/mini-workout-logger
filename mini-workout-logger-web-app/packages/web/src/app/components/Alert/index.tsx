import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';
import { MdErrorOutline, MdInfoOutline, MdCheckCircleOutline, MdWarningAmber } from 'react-icons/md';
import type { ReactNode } from 'react';
import IconButton from '../IconButton';
import styles, { type AlertVariant } from './index.style';

export type { AlertVariant };

export type AlertItem = {
    id: string;
    message: string;
    variant: AlertVariant;
    duration?: number;
};

const VARIANT_ICONS: Record<AlertVariant, ReactNode> = {
    error:   <MdErrorOutline />,
    info:    <MdInfoOutline />,
    success: <MdCheckCircleOutline />,
    warning: <MdWarningAmber />,
};

const DEFAULT_DURATION = 4000;

type AlertEntryProps = {
    item: AlertItem;
    onRemove: (id: string) => void;
};

const AlertEntry = ({ item, onRemove }: AlertEntryProps) => {
    const [closing, setClosing] = useState(false);
    const [paused, setPaused] = useState(false);

    const dismiss = () => {
        setClosing(true);
        setTimeout(() => onRemove(item.id), 300);
    };

    useEffect(() => {
        if (paused) return;
        const timer = setTimeout(dismiss, item.duration ?? DEFAULT_DURATION);
        return () => clearTimeout(timer);
    }, [paused]);

    return (
        <div
            css={styles.alert(item.variant, closing)}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onClick={(e) => e.stopPropagation()}
        >
            <span css={styles.icon(item.variant)}>{VARIANT_ICONS[item.variant]}</span>
            <span css={styles.message}>{item.message}</span>
            <IconButton
                icon={<IoClose />}
                onClick={dismiss}
                size="sm"
                customCss={styles.closeButtonOverride(item.variant)}
            />
        </div>
    );
};

type AlertContainerProps = {
    alerts: AlertItem[];
    onRemove: (id: string) => void;
};

const AlertContainer = ({ alerts, onRemove }: AlertContainerProps) => {
    if (alerts.length === 0) return null;

    return createPortal(
        <div css={styles.container}>
            {alerts.map((alertItem) => (
                <AlertEntry key={alertItem.id} item={alertItem} onRemove={onRemove} />
            ))}
        </div>,
        document.body
    );
};

export default AlertContainer;
