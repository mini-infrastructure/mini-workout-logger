import { useState, useRef, useMemo, type ReactNode, type ChangeEvent } from 'react';
import type { SerializedStyles } from '@emotion/react';
import { FiCheck, FiInbox } from 'react-icons/fi';
import { useClickOut } from '../../hooks/useClickOut';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import styles from './index.style';

export type DropdownOption<T = string> = {
    value: T;
    label: string;
    icon?: ReactNode;
    image?: string;
    disabled?: boolean;
};

export type DropdownGroup<T = string> = {
    label: string;
    options: DropdownOption<T>[];
};

type BaseDropdownProps<T> = {
    options?: DropdownOption<T>[];
    groupedOptions?: DropdownGroup<T>[];
    open: boolean;
    onClose: () => void;
    searchable?: boolean;
    searchPlaceholder?: string;
    loading?: boolean;
    emptyMessage?: string;
    customCss?: SerializedStyles;
};

type SingleSelectProps<T> = BaseDropdownProps<T> & {
    multiple?: false;
    value: T | null;
    onChange: (value: T | null) => void;
    selectAll?: never;
    selectAllLabel?: never;
};

type MultiSelectProps<T> = BaseDropdownProps<T> & {
    multiple: true;
    value: T[];
    onChange: (value: T[]) => void;
    selectAll?: boolean;
    selectAllLabel?: string;
};

export type DropdownProps<T = string> = SingleSelectProps<T> | MultiSelectProps<T>;

const Dropdown = <T extends string | number = string>({
    options = [],
    groupedOptions,
    value,
    onChange,
    multiple = false,
    open,
    onClose,
    searchable = false,
    searchPlaceholder = 'Search...',
    selectAll = false,
    selectAllLabel = 'Select all',
    loading = false,
    emptyMessage = 'No options found',
    customCss,
}: DropdownProps<T>) => {
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    useClickOut(containerRef, onClose);
    useEscapeKey(onClose);

    const allOptions = useMemo(() => {
        if (groupedOptions) {
            return groupedOptions.flatMap(group => group.options);
        }
        return options;
    }, [options, groupedOptions]);

    const filteredOptions = useMemo(() => {
        if (!searchQuery) return options;
        const query = searchQuery.toLowerCase();
        return options.filter(opt => opt.label.toLowerCase().includes(query));
    }, [options, searchQuery]);

    const filteredGroupedOptions = useMemo(() => {
        if (!groupedOptions) return undefined;
        if (!searchQuery) return groupedOptions;

        const query = searchQuery.toLowerCase();
        return groupedOptions
            .map(group => ({
                ...group,
                options: group.options.filter(opt => opt.label.toLowerCase().includes(query)),
            }))
            .filter(group => group.options.length > 0);
    }, [groupedOptions, searchQuery]);

    const isSelected = (optionValue: T): boolean => {
        if (multiple) {
            return (value as T[]).includes(optionValue);
        }
        return value === optionValue;
    };

    const handleSelect = (optionValue: T, disabled?: boolean) => {
        if (disabled) return;

        if (multiple) {
            const currentValues = value as T[];
            const newValues = currentValues.includes(optionValue)
                ? currentValues.filter(v => v !== optionValue)
                : [...currentValues, optionValue];
            (onChange as (value: T[]) => void)(newValues);
        } else {
            (onChange as (value: T | null) => void)(optionValue);
            onClose();
        }
    };

    const handleSelectAll = () => {
        if (!multiple) return;

        const currentValues = value as T[];
        const selectableOptions = allOptions.filter(opt => !opt.disabled);
        const allSelected = selectableOptions.every(opt => currentValues.includes(opt.value));

        if (allSelected) {
            (onChange as (value: T[]) => void)([]);
        } else {
            (onChange as (value: T[]) => void)(selectableOptions.map(opt => opt.value));
        }
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const isAllSelected = () => {
        if (!multiple) return false;
        const currentValues = value as T[];
        const selectableOptions = allOptions.filter(opt => !opt.disabled);
        return selectableOptions.length > 0 && selectableOptions.every(opt => currentValues.includes(opt.value));
    };

    const renderCheckbox = (checked: boolean, isOnSelectedItem: boolean = false) => (
        <span css={[
            styles.checkbox,
            checked && (isOnSelectedItem ? styles.checkboxCheckedOnSelected : styles.checkboxChecked),
        ]}>
            {checked && <FiCheck />}
        </span>
    );

    const renderItem = (option: DropdownOption<T>) => {
        const selected = isSelected(option.value);

        return (
            <div
                key={String(option.value)}
                css={[
                    styles.item,
                    selected && styles.itemSelected,
                    option.disabled && styles.itemDisabled,
                ]}
                onClick={() => handleSelect(option.value, option.disabled)}
            >
                {multiple && renderCheckbox(selected, selected)}

                {option.image && (
                    <img src={option.image} alt={option.label} css={styles.itemImage} />
                )}

                {option.icon && !option.image && (
                    <span css={styles.itemIcon}>{option.icon}</span>
                )}

                <span css={styles.itemLabel}>{option.label}</span>

                {!multiple && selected && (
                    <span css={styles.itemIcon}>
                        <FiCheck />
                    </span>
                )}
            </div>
        );
    };

    if (!open) return null;

    const hasOptions = filteredGroupedOptions
        ? filteredGroupedOptions.some(g => g.options.length > 0)
        : filteredOptions.length > 0;

    return (
        <div ref={containerRef} css={[styles.container, customCss]}>
            {searchable && (
                <div css={styles.searchContainer}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder={searchPlaceholder}
                            css={styles.searchInput}
                            autoFocus
                        />
                    </div>
                </div>
            )}

            {multiple && selectAll && hasOptions && !loading && (
                <div css={styles.selectAllContainer}>
                    <div
                        css={[styles.selectAllItem, isAllSelected() && styles.selectAllItemActive]}
                        onClick={handleSelectAll}
                    >
                        {renderCheckbox(isAllSelected(), isAllSelected())}
                        <span>{selectAllLabel}</span>
                    </div>
                </div>
            )}

            <div css={styles.listContainer}>
                {loading ? (
                    <div css={styles.loadingState}>
                        <div css={styles.loadingSpinner} />
                    </div>
                ) : !hasOptions ? (
                    <div css={styles.emptyState}>
                        <FiInbox css={styles.emptyIcon} />
                        <span>{emptyMessage}</span>
                    </div>
                ) : filteredGroupedOptions ? (
                    filteredGroupedOptions.map(group => (
                        <div key={group.label}>
                            <div css={styles.groupLabel}>{group.label}</div>
                            {group.options.map(renderItem)}
                        </div>
                    ))
                ) : (
                    filteredOptions.map(renderItem)
                )}
            </div>
        </div>
    );
};

export default Dropdown;
