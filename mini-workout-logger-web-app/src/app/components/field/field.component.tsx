import type {PropsWithChildren} from "react";
import styles from "./field.component.style.tsx";
import Button from "../button/button.component.tsx";
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
        } catch (error) {
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
