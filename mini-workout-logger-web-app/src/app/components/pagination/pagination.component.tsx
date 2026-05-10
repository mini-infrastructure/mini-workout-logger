import {useEffect} from 'react';
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
    const safeTotalPages = Math.max(1, totalPages);
    const safePage = Math.min(page, safeTotalPages - 1);

    // Reset page to last valid page when totalPages shrinks (e.g. after filtering).
    useEffect(() => {
        if (totalPages > 0 && page >= totalPages) {
            onPageChange(totalPages - 1);
        }
    }, [totalPages, page, onPageChange]);

    const customCssArray = customCss
        ? Array.isArray(customCss) ? customCss : [customCss]
        : [];

    const atStart = safePage === 0;
    const atEnd   = safePage >= safeTotalPages - 1;

    return (
        <div css={[styles.container, ...customCssArray]}>
            <Button
                icon={<FaAngleDoubleLeft />}
                disabled={atStart}
                onClick={() => onPageChange(0)}
                customCss={styles.button(atStart)}
            />
            <Button
                icon={<FaChevronLeft />}
                disabled={atStart}
                onClick={() => onPageChange(safePage - 1)}
                customCss={styles.button(atStart)}
            />
            <span css={styles.label}>{safePage + 1} / {safeTotalPages}</span>
            <Button
                icon={<FaChevronRight />}
                disabled={atEnd}
                onClick={() => onPageChange(safePage + 1)}
                customCss={styles.button(atEnd)}
            />
            <Button
                icon={<FaAngleDoubleRight />}
                disabled={atEnd}
                onClick={() => onPageChange(safeTotalPages - 1)}
                customCss={styles.button(atEnd)}
            />
        </div>
    );
};

export default Pagination;
