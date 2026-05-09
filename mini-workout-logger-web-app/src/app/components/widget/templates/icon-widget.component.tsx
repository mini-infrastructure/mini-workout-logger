import {useState} from 'react';
import type {JSX} from '@emotion/react/jsx-runtime';
import OnlyIconButton from '../../button/only-icon-button.component.tsx';
import BlobGlassBackground from '../../background/blob-glass/blob-glass.component.tsx';
import styles from './icon-widget.component.style.tsx';

export type IconWidgetBackground = 'SOLID' | 'GLASS' | 'BLOB_GLASS';

export type IconWidgetProps = {
    /** Icon displayed on the left, always with a soft transparent tint background. */
    icon: JSX.Element;
    /** Label above the highlighted text. Rendered uppercase. */
    header: string;
    /** The prominent number or text shown in large font. */
    highlightedText: string | number;
    /** Optional secondary line below the highlighted text. */
    subText?: string | number;
    /**
     * CSS variable name (without `var()`), e.g. `'--color-blue'`.
     * Controls the icon tint, icon background, and the border color on hover.
     * Default: `'--color-blue'`.
     */
    color?: string;
    /** CSS variable name for the header label color. Default: `'--color-border'`. */
    headerColor?: string;
    /** CSS variable name for the highlighted text color. Default: `'--color-white'`. */
    highlightedColor?: string;
    /** CSS variable name for the sub text color. Default: `'--color-border'`. */
    subColor?: string;
    /** Background style. Default: `'SOLID'`. */
    background?: IconWidgetBackground;
    /** When provided, the widget becomes clickable. */
    onClick?: () => void;
};

const IconWidget = ({
    icon,
    header,
    highlightedText,
    subText,
    color = '--color-blue',
    headerColor = '--color-border',
    highlightedColor = '--color-white',
    subColor = '--color-border',
    background = 'SOLID',
    onClick,
}: IconWidgetProps) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            css={styles.root(color, background, hovered, !!onClick)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
        >
            {background === 'BLOB_GLASS' && (
                <BlobGlassBackground
                    childrenInFront={false}
                    customCss={{ borderRadius: 'var(--borderRadius-medium)' }}
                />
            )}

            <div css={styles.icon}>
                <OnlyIconButton
                    icon={icon}
                    iconColor={color}
                    size="large"
                    customCss={styles.iconButton(color, hovered)}
                />
            </div>

            <span css={styles.header(headerColor)}>{header}</span>
            <span css={styles.highlighted(highlightedColor)}>{highlightedText}</span>
            {subText !== undefined && (
                <span css={styles.sub(subColor)}>{subText}</span>
            )}
        </div>
    );
};

export default IconWidget;
