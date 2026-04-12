import type { Interpolation, Theme } from '@emotion/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './pagination.component.style.tsx';

export type PaginationProps = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const Pagination = ({ page, totalPages, onPageChange, customCss }: PaginationProps) => {
    const customCssArray = customCss
        ? Array.isArray(customCss) ? customCss : [customCss]
        : [];

    return (
        <div css={[styles.container, ...customCssArray]}>
            <button
                css={styles.button(page === 0)}
                onClick={() => onPageChange(page - 1)}
            >
                <FaChevronLeft />
            </button>
            <span css={styles.label}>{page + 1} / {totalPages}</span>
            <button
                css={styles.button(page >= totalPages - 1)}
                onClick={() => onPageChange(page + 1)}
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Pagination;
