import { useState, type ReactNode } from 'react';
import { css } from '@emotion/react';
import type { AccentColor } from '../../themes/tokens';
import IconButton from '../IconButton';
import PrimaryButton from '../PrimaryButton';
import styles from './index.style';

// Contrast color mapping for the favorite icon in version 2 selected state (better visibility)
const accentContrastColors: Record<AccentColor, string> = {
    blue: '#424589',
    red: '#A8371F',
    yellow: '#B68506',
    green: '#6DB370',
    pink: '#903436',
};

export type CellField = {
    label: string;
    value: string;
    icon?: ReactNode;
};

type CellProps = {
    /** Title of the cell */
    title: string;
    /** Description below the title */
    description?: string;
    /** Image URL for the cell */
    image?: string;
    /** Accent color for the colored background */
    color?: AccentColor;
    /** Fields to display as disabled inputs */
    fields?: CellField[];
    /** Action button label */
    actionLabel?: string;
    /** Action button click handler */
    onAction?: () => void;
    /** Whether the cell is favorited/saved */
    isFavorite?: boolean;
    /** Callback when favorite is toggled */
    onFavoriteToggle?: (isFavorite: boolean) => void;
    /** Icon for favorite button (unselected state) */
    favoriteIcon?: ReactNode;
    /** Icon for favorite button (selected/favorited state) */
    favoriteIconSelected?: ReactNode;
    /** Whether the cell is selected (shows full colored background) */
    isSelected?: boolean;
    /** Callback when cell selection changes */
    onSelectionChange?: (isSelected: boolean) => void;
    /** Rating value (0 to ratingMax) - only shown in version 1 with image */
    ratingValue?: number;
    /** Maximum rating value (default 3) */
    ratingMax?: number;
    /** Icon for rating (unselected state - hollow) */
    ratingIcon?: ReactNode;
    /** Icon for rating (selected state - filled) */
    ratingIconSelected?: ReactNode;
    /** Callback when rating changes */
    onRatingChange?: (value: number) => void;
};

const Cell = ({
    title,
    description,
    image,
    color = 'blue',
    fields = [],
    actionLabel = 'View',
    onAction,
    isFavorite = false,
    onFavoriteToggle,
    favoriteIcon,
    favoriteIconSelected,
    isSelected = false,
    onSelectionChange,
    ratingValue = 0,
    ratingMax = 3,
    ratingIcon,
    ratingIconSelected,
    onRatingChange,
}: CellProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleCardClick = (e: React.MouseEvent) => {
        // Don't toggle selection if clicking on favorite button or action button
        const target = e.target as HTMLElement;
        if (target.closest('button')) return;

        onSelectionChange?.(!isSelected);
    };

    const handleFavoriteClick = () => {
        onFavoriteToggle?.(!isFavorite);
    };

    const handleActionClick = () => {
        onAction?.();
    };

    const handleRatingClick = (index: number) => {
        // If clicking the same level that's already selected, deselect (set to 0)
        // Otherwise, set to the clicked level
        const newValue = ratingValue === index + 1 ? 0 : index + 1;
        onRatingChange?.(newValue);
    };

    // Check if rating should be shown (version 1 with image and rating props)
    const showRating = !isSelected && image && ratingIcon && onRatingChange;

    // Determine if waves should animate
    const shouldAnimate = isHovered || isSelected;

    // Determine which icon to show for the favorite button
    // When favorited: use filled icon (favoriteIconSelected)
    // When not favorited: use hollow icon (favoriteIcon)
    const currentFavoriteIcon = isFavorite && favoriteIconSelected ? favoriteIconSelected : favoriteIcon;

    return (
        <div
            css={[styles.root, isSelected && styles.rootSelected]}
            onClick={handleCardClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Full background for selected state */}
            <div
                css={[
                    styles.fullBackground,
                    styles.waveBackground(color, shouldAnimate),
                    isSelected && styles.fullBackgroundVisible,
                ]}
            />

            {/* Content wrapper */}
            <div css={styles.content}>
                {/* Colored rectangle - fades out when selected and has image */}
                <div
                    css={[
                        styles.coloredRectangle,
                        styles.waveBackground(color, shouldAnimate),
                        isSelected && image && styles.coloredRectangleHidden,
                    ]}
                />

                {/* Image - transitions from small/overlapping to full-width square */}
                {image && (
                    <div css={[styles.imageContainer, isSelected && styles.imageContainerSelected]}>
                        <img src={image} alt={title} css={[styles.image, isSelected && styles.imageSelected]} />

                        {/* Rating icons (version 1 only, positioned to the right of image) */}
                        {showRating && (
                            <div css={styles.ratingContainer}>
                                {Array.from({ length: ratingMax }, (_, index) => {
                                    const isActive = index < ratingValue;
                                    const icon = isActive && ratingIconSelected ? ratingIconSelected : ratingIcon;
                                    return (
                                        <IconButton
                                            key={index}
                                            icon={icon}
                                            onClick={() => handleRatingClick(index)}
                                            size="sm"
                                            noHover
                                            customCss={isActive ? styles.ratingButtonActive : styles.ratingButton}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Header with title, description and favorite button */}
                <div css={styles.header}>
                    <div css={styles.titleGroup}>
                        <h3 css={[styles.title, isSelected && styles.titleSelected]}>
                            {title || '(No title)'}
                        </h3>
                        {description && (
                            <p css={[styles.description, isSelected && styles.descriptionSelected]}>
                                {description}
                            </p>
                        )}
                    </div>

                    {onFavoriteToggle && favoriteIcon && (
                        <IconButton
                            icon={currentFavoriteIcon}
                            isSelected={isFavorite}
                            onClick={handleFavoriteClick}
                            tooltip={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                            size="md"
                            noHover
                            customCss={[
                                isSelected
                                    ? (isFavorite ? styles.favoriteButtonSelectedActive : styles.favoriteButtonSelected)
                                    : (isFavorite ? styles.favoriteButtonActive : styles.favoriteButton),
                                // Version 2 favorited: use contrast color for better visibility (with hover override)
                                isSelected && isFavorite && css({
                                    color: accentContrastColors[color],
                                    '&:hover:not(:disabled)': {
                                        color: accentContrastColors[color],
                                    },
                                }),
                            ]}
                        />
                    )}
                </div>

                {/* Fields grid */}
                {fields.length > 0 && (
                    <div css={styles.fieldsGrid}>
                        {fields.map((field, index) => (
                            <div
                                key={index}
                                css={[styles.field, isSelected && styles.fieldSelected]}
                            >
                                <span css={[styles.fieldLabel, isSelected && styles.fieldLabelSelected]}>
                                    {field.label}
                                </span>
                                <span css={[styles.fieldValue, isSelected && styles.fieldValueSelected]}>
                                    {field.icon && <span css={styles.fieldIcon}>{field.icon}</span>}
                                    {field.value}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Action button */}
                {onAction && (
                    <div css={styles.actionContainer}>
                        <PrimaryButton
                            label={actionLabel}
                            onClick={handleActionClick}
                            customCss={isSelected ? styles.actionButtonSelected : styles.actionButton}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cell;
export type { CellProps };
