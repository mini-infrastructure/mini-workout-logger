import type {PropsWithChildren} from "react";
import {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import styles from "./modal.component.style.tsx";
import Button from "../button/button.component.tsx";
import {IoClose} from "react-icons/io5";
import {useClickOut} from "../../hooks/useClickOut.tsx";

export type ModalProps = {
    open: boolean;
    onClose: () => void;
    showCloseButton?: boolean;
};

const Modal = ({
                   open,
                   onClose,
                   showCloseButton = true,
                   children,
               }: PropsWithChildren<ModalProps>) => {

    // Focus the modal when it opens; Close the modal when Escape is pressed.
    const containerRef = useRef<HTMLDivElement | null>(null);
    useClickOut(containerRef, onClose);

    if (!open) return null;

    return createPortal(
        <div css={styles.overlayStyle} onMouseDown={onClose}>
            <div
                css={styles.modalStyle}
                onMouseDown={(e) => e.stopPropagation()}
            >
                {showCloseButton && (
                    <Button
                        icon={<IoClose />}
                        onClick={onClose}
                        customCss={styles.closeButton}
                        customIconCss={styles.closeButtonIcon}
                    ></Button>
                )}
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;