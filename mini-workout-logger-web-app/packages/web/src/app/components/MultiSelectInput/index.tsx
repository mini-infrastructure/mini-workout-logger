import { useState, useRef, useMemo, type ReactNode } from 'react';
import type { SerializedStyles } from '@emotion/react';
import { FiChevronDown, FiX } from 'react-icons/fi';
import TextInput from '../TextInput';
import Dropdown, { type DropdownOption, type DropdownGroup } from '../Dropdown';
import { useClickOut } from '../../hooks/useClickOut';
import styles from './index.style';

type BadgeProps = {
    label: ReactNode;
    onRemove: () => void;
};

const Badge = ({ label, onRemove }: BadgeProps) => {
    const [isBadgeHovered, setIsBadgeHovered] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    return (
        <span
            css={styles.badge}
            onMouseEnter={() => setIsBadgeHovered(true)}
            onMouseLeave={() => setIsBadgeHovered(false)}
        >
            {label}
            <button
                type="button"
                css={[
                    styles.badgeRemove,
                    isBadgeHovered && styles.badgeRemoveInverted,
                    isButtonHovered && (isBadgeHovered ? styles.badgeRemoveHoverInverted : styles.badgeRemoveHover),
                ]}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}
            >
                <FiX />
            </button>
        </span>
    );
};

export type MultiSelectInputProps<T = string> = {
    name: string;
    label: string;
    options?: DropdownOption<T>[];
    groupedOptions?: DropdownGroup<T>[];
    value: T[];
    onChange: (value: T[]) => void;
    placeholder?: string;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    required?: boolean;
    searchable?: boolean;
    searchPlaceholder?: string;
    selectAll?: boolean;
    selectAllLabel?: string;
    loading?: boolean;
    emptyMessage?: string;
    showBadges?: boolean;
    maxBadges?: number;
    customCss?: SerializedStyles;
};

const MultiSelectInput = <T extends string | number = string>({
    name,
    label,
    options = [],
    groupedOptions,
    value,
    onChange,
    placeholder,
    error,
    helperText,
    disabled = false,
    required = false,
    searchable = false,
    searchPlaceholder,
    selectAll = false,
    selectAllLabel,
    loading = false,
    emptyMessage,
    showBadges = true,
    maxBadges = 5,
    customCss,
}: MultiSelectInputProps<T>) => {
    const [open, setOpen] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useClickOut(wrapperRef, () => setOpen(false));

    const allOptions = useMemo(() => {
        if (groupedOptions) {
            return groupedOptions.flatMap(group => group.options);
        }
        return options;
    }, [options, groupedOptions]);

    const selectedOptions = allOptions.filter(opt => value.includes(opt.value));

    const handleToggle = () => {
        if (!disabled) {
            setOpen(prev => !prev);
            setHasAnimated(true);
        }
    };

    const handleRemove = (valueToRemove: T) => {
        onChange(value.filter(v => v !== valueToRemove));
    };

    const getArrowStyle = () => {
        if (!hasAnimated) return styles.arrowIcon;
        return open ? styles.arrowIconOpen : styles.arrowIconClosed;
    };

    const displayValue = selectedOptions.length > 0
        ? `${selectedOptions.length} selected`
        : '';

    const visibleBadges = selectedOptions.slice(0, maxBadges);
    const remainingCount = selectedOptions.length - maxBadges;

    return (
        <div ref={wrapperRef} css={[styles.wrapper, customCss]}>
            <div css={styles.inputContainer} onClick={handleToggle}>
                <TextInput
                    name={name}
                    label={label}
                    value={displayValue}
                    onChange={() => {}}
                    placeholder={placeholder}
                    error={error}
                    helperText={helperText}
                    disabled={disabled}
                    required={required}
                    loading={loading}
                    icon={
                        <FiChevronDown css={getArrowStyle()} />
                    }
                    iconPosition="right"
                    customCss={{ pointerEvents: 'none' } as unknown as SerializedStyles}
                />
            </div>

            <Dropdown
                options={options}
                groupedOptions={groupedOptions}
                value={value}
                onChange={onChange}
                multiple
                open={open}
                onClose={() => setOpen(false)}
                searchable={searchable}
                searchPlaceholder={searchPlaceholder}
                selectAll={selectAll}
                selectAllLabel={selectAllLabel}
                loading={loading}
                emptyMessage={emptyMessage}
            />

            {showBadges && selectedOptions.length > 0 && !disabled && (
                <div css={styles.badgesContainer}>
                    {visibleBadges.map(option => (
                        <Badge
                            key={String(option.value)}
                            label={option.label}
                            onRemove={() => handleRemove(option.value)}
                        />
                    ))}
                    {remainingCount > 0 && (
                        <span css={styles.moreIndicator}>
                            +{remainingCount} more
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default MultiSelectInput;
