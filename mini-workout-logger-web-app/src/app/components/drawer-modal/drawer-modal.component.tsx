import type {PropsWithChildren} from 'react';
import {useRef, useState} from 'react';
import type {JSX} from '@emotion/react/jsx-runtime';
import {createPortal} from 'react-dom';
import {IoClose} from 'react-icons/io5';
import Button from '../button/button.component.tsx';
import {useClickOut} from '../../hooks/useClickOut.tsx';
import styles from './drawer-modal.component.style.tsx';

export type DrawerModalProps = {
    open: boolean;
    onClose: () => void;
    showCloseButton?: boolean;
    headerButton?: JSX.Element;
};

const DrawerModal = ({
    open,
    onClose,
    showCloseButton = true,
    headerButton,
    children,
}: PropsWithChildren<DrawerModalProps>) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 250);
    };

    const drawerRef = useRef<HTMLDivElement | null>(null);
    useClickOut(drawerRef, handleClose);

    if (!open) return null;

    return createPortal(
        <div css={styles.overlay}>
            <div
                ref={drawerRef}
                css={[styles.drawer, isClosing ? styles.closeEffect : styles.openEffect]}
            >
                {(showCloseButton || headerButton) && (
                    <div css={styles.headerButtons}>
                        {headerButton}
                        {showCloseButton && (
                            <Button
                                icon={<IoClose />}
                                onClick={handleClose}
                                noBorder
                                customCss={styles.closeButton}
                                customIconCss={styles.closeButtonIcon}
                            />
                        )}
                    </div>
                )}
                {children}
            </div>
        </div>,
        document.body
    );
};

export default DrawerModal;
