import {useState} from 'react';
import type {Interpolation, Theme} from '@emotion/react';
import styles from './dropdown-list-options.component.style.tsx';

export type DropdownListOption = {
    label: string;
    value: string;
};

export type DropdownListOptionsProps = {
    options: DropdownListOption[];
    selected: string[];
    onSelect: (value: string) => void;
    onSelectAll?: (allCurrentlySelected: boolean) => void;
    multiSelect?: boolean;
    showSelectAll?: boolean;
    searchable?: boolean;
    wide?: boolean;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const DropdownListOptions = ({
    options,
    selected,
    onSelect,
    onSelectAll,
    multiSelect = false,
    showSelectAll = false,
    searchable = false,
    wide = false,
    customCss,
}: DropdownListOptionsProps) => {
    const [search, setSearch] = useState('');

    const filtered = search
        ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
        : options;

    const allSelected = options.length > 0 && options.every((o) => selected.includes(o.value));

    const handleSelectAll = () => {
        onSelectAll?.(allSelected);
    };

    const cssArray = [
        styles.container,
        wide ? styles.containerWide : undefined,
        ...(customCss ? (Array.isArray(customCss) ? customCss : [customCss]) : []),
    ];

    return (
        <div css={cssArray}>
            {searchable && (
                <div css={styles.searchRow}>
                    <input
                        css={styles.searchInput}
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {multiSelect && showSelectAll && !search && (
                <div css={styles.item(allSelected)} onClick={handleSelectAll}>
                    <input type="checkbox" checked={allSelected} readOnly />
                    <span>Select all</span>
                </div>
            )}

            {filtered.map((opt) => {
                const checked = selected.includes(opt.value);
                return (
                    <div
                        key={opt.value}
                        css={styles.item(checked)}
                        onMouseDown={(e) => {
                            e.preventDefault(); // keep input focused; fires before blur
                            onSelect(opt.value);
                        }}
                    >
                        {multiSelect && <input type="checkbox" checked={checked} readOnly />}
                        <span>{opt.label}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default DropdownListOptions;
