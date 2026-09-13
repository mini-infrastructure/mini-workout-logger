import type { ReactNode } from 'react';
import type { AccentColor } from '../../themes/tokens';
import IconButton from '../IconButton';
import styles from './index.style';

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
    /** Accent color for the image background */
    color?: AccentColor;
    /** Fields to display in the body */
    fields?: CellField[];
    /** Whether the cell is favorited/saved */
    isFavorite?: boolean;
    /** Callback when favorite is toggled */
    onFavoriteToggle?: (isFavorite: boolean) => void;
    /** Icon for favorite button (unselected state) */
    favoriteIcon?: ReactNode;
    /** Icon for favorite button (selected/favorited state) */
    favoriteIconSelected?: ReactNode;
};

const Cell = ({
    title,
    description,
    image,
    color = 'blue',
    fields = [],
    isFavorite = false,
    onFavoriteToggle,
    favoriteIcon,
    favoriteIconSelected,
}: CellProps) => {
    const handleFavoriteClick = () => {
        onFavoriteToggle?.(!isFavorite);
    };

    const currentFavoriteIcon = isFavorite && favoriteIconSelected ? favoriteIconSelected : favoriteIcon;

    return (
        <div css={styles.root}>
            {/* Header: Image + Title/Description + Favorite button */}
            <div css={styles.header}>
                {/* Image with colored background */}
                <div css={[styles.imageContainer, styles.imageBackground(color)]}>
                    {image ? (
                        <img src={image} alt={title} css={styles.image} />
                    ) : (
                        <div css={styles.imagePlaceholder} />
                    )}
                </div>

                {/* Title and description */}
                <div css={styles.titleGroup}>
                    <h3 css={styles.title}>{title || '(No title)'}</h3>
                    {description && (
                        <p css={styles.description}>{description}</p>
                    )}
                </div>

                {/* Favorite button */}
                {onFavoriteToggle && favoriteIcon && (
                    <IconButton
                        icon={currentFavoriteIcon}
                        isSelected={isFavorite}
                        onClick={handleFavoriteClick}
                        tooltip={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        size="md"
                        noHover
                        customCss={isFavorite ? styles.favoriteButtonActive : styles.favoriteButton}
                    />
                )}
            </div>

            {/* Body: Fields grid */}
            {fields.length > 0 && (
                <div css={styles.fieldsGrid}>
                    {fields.map((field, index) => (
                        <div key={index} css={styles.field}>
                            <span css={styles.fieldLabel}>{field.label}</span>
                            <span css={styles.fieldValue}>
                                {field.icon && <span css={styles.fieldIcon}>{field.icon}</span>}
                                {field.value}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cell;
export type { CellProps };
