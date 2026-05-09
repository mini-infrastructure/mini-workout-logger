import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { Interpolation, Theme } from '@emotion/react';
import { IoMdClose } from 'react-icons/io';
import OnlyIconButton from '../button/only-icon-button.component.tsx';
import { badgeVariantStyles } from './badge.component.tsx';
import badgeStyles from './badge.component.style.tsx';
import type { ColorVariant } from '../../utils/colorsVariants.tsx';
import type * as React from 'react';
import { useClickOut } from '../../hooks/useClickOut.tsx';
import styles from './editable-badge.component.style.tsx';

export type EditableBadgeProps = {
    key?: string | number;
    children: string;
    onRemove?: () => void;
    onEdit?: (newValue: string) => void;
    forceSelected?: boolean;
    variant?: ColorVariant;
    ghost?: boolean;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const EditableBadge = ({
    children,
    onRemove,
    onEdit,
    forceSelected = false,
    variant = 'gray',
    ghost = true,
    customCss,
}: EditableBadgeProps) => {
    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(children);
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (editMode && onEdit) inputRef.current?.focus();
    }, [editMode, onEdit]);

    useClickOut(wrapperRef as React.RefObject<HTMLDivElement | null>, () => {
        if (!editMode) return;
        if (onEdit) commitEdit();
        else setEditMode(false);
    });

    const commitEdit = () => {
        const trimmed = inputValue.trim();
        setEditMode(false);
        if (onEdit && trimmed && trimmed !== children) {
            onEdit(trimmed);
        } else {
            setInputValue(children);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') commitEdit();
        if (e.key === 'Escape') { setInputValue(children); setEditMode(false); }
    };

    const handleBadgeClick = () => {
        if (!editMode) {
            setInputValue(children);
            setEditMode(true);
        }
    };

    return (
        <span
            ref={wrapperRef}
            data-selected={editMode}
            css={[
                badgeStyles.badge,
                variant === 'primary' && !ghost ? badgeStyles.primarySolidBadge : badgeVariantStyles[variant],
                ...(customCss ? (Array.isArray(customCss) ? customCss : [customCss]) : []),
            ]}
            onClick={handleBadgeClick}
        >
            <span css={styles.inner}>
                {editMode && onEdit ? (
                    <input
                        ref={inputRef}
                        css={styles.input}
                        value={inputValue}
                        style={{ width: `${Math.max(inputValue.length, 4)}ch` }}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onClick={(e) => e.stopPropagation()}
                    />
                ) : (
                    <span>{children}</span>
                )}

                {(editMode || forceSelected) && onRemove && (
                    <span onClick={(e) => e.stopPropagation()}>
                        <OnlyIconButton
                            icon={<IoMdClose />}
                            onToggle={onRemove}
                            size="mini"
                            iconColor="--color-text"
                        />
                    </span>
                )}
            </span>
        </span>
    );
};

export default EditableBadge;
