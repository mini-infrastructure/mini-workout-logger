import { useRef } from 'react';
import type { Interpolation, Theme } from '@emotion/react';
import { FaImage } from 'react-icons/fa';
import { MdUpload } from 'react-icons/md';
import styles from './media-item.component.style.tsx';

export type MediaItemProps = {
    /** Base64 data URI or a full URL. When undefined, renders the placeholder. */
    src?: string;
    /** Alt text for the image. */
    alt?: string;
    /** Pixel size of the square (both width and height). Default: 64. */
    size?: number;
    /** When provided the component becomes interactive and opens a file picker on click. */
    onUpload?: (file: File) => void;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const MediaItem = ({ src, alt = '', size = 64, onUpload, customCss }: MediaItemProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (onUpload) inputRef.current?.click();
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
            css={[styles.root(size), onUpload ? styles.clickable : undefined, customCss]}
            onClick={handleClick}
        >
            {src ? (
                <img css={styles.img} src={src} alt={alt} />
            ) : (
                <span css={styles.placeholder}>
                    <FaImage />
                </span>
            )}

            {onUpload && (
                <span className="media-overlay" css={styles.overlay}>
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

export default MediaItem;
