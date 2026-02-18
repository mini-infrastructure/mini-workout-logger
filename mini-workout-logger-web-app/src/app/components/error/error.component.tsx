import { PropsWithChildren } from 'react';
import styles from "./error.component.style.tsx";
import BlocksBackground from "../background/blocks/blocks.component.tsx";
import Button from "../button/button.component.tsx";

export type ErrorProps = {
    status: number;
    title: string;
    message: string;
    imageSrc?: string;
    imageAlt?: string;
    actionLabel?: string;
    onAction?: () => void;
};

const Error = ({
                   status,
                   title,
                   message,
                   imageSrc,
                   imageAlt,
                   actionLabel,
                   onAction,
                   children,
               }: PropsWithChildren<ErrorProps>) => {
    return (
        <div css={styles.wrapper}>

            <BlocksBackground></BlocksBackground>

            {imageSrc && (
                <img src={imageSrc} alt={imageAlt || 'Error image'} />
            )}

            <div css={[styles.content, styles.left]}>
                <h1 css={styles.status}>{status}</h1>
            </div>

            <div css={[styles.content, styles.right]}>
                <h2 css={styles.title}>{title}</h2>
                <p css={styles.message}>{message}</p>
                {actionLabel && onAction && (
                    <Button onClick={onAction}>
                        {actionLabel}
                    </Button>
                )}
            </div>

            {children}

        </div>
    );
};

export default Error;
