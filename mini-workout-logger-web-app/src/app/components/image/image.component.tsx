import {useRef} from 'react';
import type {Interpolation, Theme} from '@emotion/react';
import {FaImage} from 'react-icons/fa';
import {MdUpload} from 'react-icons/md';
import styles from './image.component.style.tsx';

export type ImageProps = {
    /** Base64 data URI or a full URL. When undefined, renders the placeholder. */
    src?: string;
    /** Alt text for the image. */
    alt?: string;
    /** Pixel size of the square (both width and height). Default: 64. */
    size?: number;
    /** When provided the component becomes interactive and opens a file picker on click. */
    onUpload?: (file: File) => void;
    /** When provided (without onUpload) the component becomes clickable with pointer cursor. */
    onClick?: () => void;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const Image = ({ src, alt = '', size = 64, onUpload, onClick, customCss }: ImageProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const isClickable = !!(onUpload || onClick);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onUpload) {
            inputRef.current?.click();
        } else {
            onClick?.();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onUpload) {
            onUpload(file);
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    return (
        <div
            css={[styles.root(size), isClickable ? styles.clickable : undefined, customCss]}
            onClick={isClickable ? handleClick : undefined}
        >
            {src ? (
                <img css={styles.img} src={src} alt={alt} />
            ) : (
                <span css={styles.placeholder}>
                    <FaImage />
                </span>
            )}

            {onUpload && (
                <span className="image-overlay" css={styles.overlay}>
                    <MdUpload />
                </span>
            )}

            {onUpload && (
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    css={styles.hiddenInput}
                    onChange={handleChange}
                />
            )}
        </div>
    );
};

export default Image;
