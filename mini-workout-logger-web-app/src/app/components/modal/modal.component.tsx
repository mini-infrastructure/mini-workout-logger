import type {PropsWithChildren} from "react";
import {useRef, useState} from "react";
import type {Interpolation, Theme} from "@emotion/react";
import {createPortal} from "react-dom";
import styles from "./modal.component.style.tsx";
import Button from "../button/button.component.tsx";
import {IoClose} from "react-icons/io5";
import {useClickOut} from "../../hooks/useClickOut.tsx";

export type ModalProps = {
    open: boolean;
    onClose: () => void;
    showCloseButton?: boolean;
    customCss?: Interpolation<Theme>;
};

const Modal = ({
                   open,
                   onClose,
                   showCloseButton = true,
                   customCss,
                   children,
               }: PropsWithChildren<ModalProps>) => {

    // Close effect.
    const [isClosing, setIsClosing] = useState(false);
    const handleClose = () => {
        setIsClosing(true);

        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 250);
    };

    // Focus the modal when it opens; Close the modal when Escape is pressed.
    const containerRef = useRef<HTMLDivElement | null>(null);
    useClickOut(containerRef, handleClose);

    if (!open) return null;

    return createPortal(
        <div css={styles.overlayStyle} onMouseDown={handleClose}>
            <div
                css={[
                    styles.modalStyle,
                    isClosing ? styles.modalCloseEffect : styles.modalOpenEffect,
                    customCss,
                ]}
                onMouseDown={(e) => e.stopPropagation()}
            >
                {showCloseButton && (
                    <Button
                        icon={<IoClose />}
                        onClick={handleClose}
                        noBorder
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