import { PropsWithChildren } from 'react';
import styles from "./index.style.tsx";

export type ErrorProps = {
    status: number;
    title: string;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
};

const Error = ({status,
                title,
                message,
                actionLabel,
                onAction,
                className,
                children,
               }: PropsWithChildren<ErrorProps>) => {
    return (
        <div className={className} css={styles.wrapper}>
            <div css={styles.content}>
                <h1 css={styles.status}>{status}</h1>
                <h2 css={styles.title}>{title}</h2>
                <p css={styles.message}>{message}</p>

                {actionLabel && onAction && (
                    <button css={styles.action} onClick={onAction}>
                        {actionLabel}
                    </button>
                )}

                {children}
            </div>
        </div>
    );
};

export default Error;
