import type { ReactNode } from 'react';
import type { Interpolation, Theme } from '@emotion/react';
import { FaSearch } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import Button from '../button/button.component.tsx';
import styles from './search.component.style.tsx';

export type SearchProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    results?: ReactNode;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const Search = ({
    value,
    onChange,
    placeholder = 'Search...',
    results,
    customCss,
}: SearchProps) => {
    const customCssArray = customCss
        ? Array.isArray(customCss) ? customCss : [customCss]
        : [];

    return (
        <div css={[styles.wrapper, ...customCssArray]}>
            <div css={styles.container}>
                <span css={styles.icon}>
                    <FaSearch />
                </span>
                <input
                    css={styles.input}
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                {value && (
                    <Button
                        icon={<MdClose />}
                        onClick={() => onChange('')}
                        customCss={styles.clearButton}
                        customIconCss={styles.clearIcon}
                    />
                )}
            </div>
            {results}
        </div>
    );
};

export default Search;
