import { useState, type ReactNode } from 'react';
import type { AccentColor } from '../../themes/tokens';
import PrimaryButton from '../PrimaryButton';
import styles from './index.style';

export type SimpleCellField = {
    label: string;
    value: string;
    icon?: ReactNode;
};

type SimpleCellProps = {
    /** Title of the cell */
    title: string;
    /** Description below the title */
    description?: string;
    /** Image URL for the cell */
    image?: string;
    /** Accent color for the image background */
    color?: AccentColor;
    /** Fields to display */
    fields?: SimpleCellField[];
    /** Action button label */
    actionLabel?: string;
    /** Action button click handler */
    onAction?: () => void;
};

const SimpleCell = ({
    title,
    description,
    image,
    color = 'blue',
    fields = [],
    actionLabel = 'View',
    onAction,
}: SimpleCellProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleCardClick = (e: React.MouseEvent) => {
        // Don't trigger card click if clicking on action button
        const target = e.target as HTMLElement;
        if (target.closest('button')) return;

        onAction?.();
    };

    return (
        <div
            css={styles.root}
            onClick={handleCardClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Content wrapper */}
            <div css={styles.content}>
                {/* Image with colored background */}
                <div css={[styles.imageContainer, styles.waveBackground(color, isHovered)]}>
                    {image && <img src={image} alt={title} css={styles.image} />}
                </div>

                {/* Title and description */}
                <div css={styles.titleGroup}>
                    <h3 css={styles.title}>{title || '(No title)'}</h3>
                    {description && <p css={styles.description}>{description}</p>}
                </div>

                {/* Fields grid */}
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

                {/* Action button */}
                {onAction && (
                    <div css={styles.actionContainer}>
                        <PrimaryButton
                            label={actionLabel}
                            onClick={onAction}
                            customCss={styles.actionButton}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SimpleCell;
export type { SimpleCellProps };
