import type {Interpolation, Theme} from '@emotion/react';
import {FaAngleDoubleLeft, FaAngleDoubleRight, FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import Button from '../button/button.component.tsx';
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
            <Button
                icon={<FaAngleDoubleLeft />}
                disabled={page === 0}
                onClick={() => onPageChange(0)}
                customCss={styles.button(page === 0)}
            />
            <Button
                icon={<FaChevronLeft />}
                disabled={page === 0}
                onClick={() => onPageChange(page - 1)}
                customCss={styles.button(page === 0)}
            />
            <span css={styles.label}>{page + 1} / {totalPages}</span>
            <Button
                icon={<FaChevronRight />}
                disabled={page >= totalPages - 1}
                onClick={() => onPageChange(page + 1)}
                customCss={styles.button(page >= totalPages - 1)}
            />
            <Button
                icon={<FaAngleDoubleRight />}
                disabled={page >= totalPages - 1}
                onClick={() => onPageChange(totalPages - 1)}
                customCss={styles.button(page >= totalPages - 1)}
            />
        </div>
    );
};

export default Pagination;
