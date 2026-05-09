import type {ReactNode} from 'react';
import {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {IoClose} from 'react-icons/io5';
import Button from '../button/button.component.tsx';
import {MdCheckCircleOutline, MdErrorOutline, MdInfoOutline, MdWarningAmber} from 'react-icons/md';
import styles from './alert.component.style.tsx';

export type AlertVariant = 'error' | 'info' | 'success' | 'warning';

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
    key: string;
    item: AlertItem;
    onRemove: (id: string) => void;
};

const AlertEntry = ({ item, onRemove }: AlertEntryProps) => {
    const [closing, setClosing] = useState(false);

    const dismiss = () => {
        setClosing(true);
        setTimeout(() => onRemove(item.id), 300);
    };

    const [paused, setPaused] = useState(false);

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
            <span css={styles.icon}>{VARIANT_ICONS[item.variant]}</span>
            <span css={styles.title}>{item.message}</span>
            <Button icon={<IoClose />} onClick={dismiss} customCss={styles.closeButton} />
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
            {alerts.map((item) => (
                <AlertEntry key={item.id} item={item} onRemove={onRemove} />
            ))}
        </div>,
        document.body
    );
};

export default AlertContainer;
