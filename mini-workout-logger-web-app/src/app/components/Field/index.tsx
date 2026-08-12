import type {PropsWithChildren} from "react";
import styles from "./index.style.tsx";
import Button from "../Button/index.tsx";
import {FiCopy} from "react-icons/fi";

export type FieldProps = {
    header?: string;
    content?: string;
};

const Field = ({
                   header,
                   content,
               }: PropsWithChildren<FieldProps>) => {
    if (!content || !header) return null;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
        } catch {
            // todo
        }
    };
    return (
        <div css={styles.description}>
            <span css={styles.header}>{header}</span>
            <span css={styles.content}>{content}</span>
            <Button
                icon={<FiCopy />}
                customCss={styles.copyButton}
                onClick={handleCopy}
            />
        </div>
    );
};

export default Field;
