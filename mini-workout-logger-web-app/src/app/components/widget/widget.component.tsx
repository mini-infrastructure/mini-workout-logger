import type { JSX } from '@emotion/react/jsx-runtime';
import type { Interpolation, Theme } from '@emotion/react';
import { FaTrashAlt } from 'react-icons/fa';
import { PiResizeBold } from 'react-icons/pi';
import { RiEdit2Fill } from 'react-icons/ri';
import Card from '../card/card.component.tsx';
import DropdownMenu from '../dropdown-menu/dropdown-menu.component.tsx';
import BlobGlassBackground from '../background/blob-glass/blob-glass.component.tsx';
import styles from './widget.component.style.tsx';

export type WidgetBackground = 'SOLID' | 'GLASS';

export type WidgetProps = {
    editMode: boolean;
    background?: WidgetBackground;
    backgroundColor?: string;
    onClick?: () => void;
    onDelete?: () => void;
    onResize?: () => void;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
    children: JSX.Element;
};

const Widget = ({
    editMode,
    background = 'SOLID',
    backgroundColor,
    onClick,
    onDelete,
    onResize,
    customCss,
    children,
}: WidgetProps) => {
    const cardStyle: Interpolation<Theme>[] = [
        styles.card,
        background === 'GLASS' ? styles.cardGlass : null,
        backgroundColor ? ({ backgroundColor } as Interpolation<Theme>) : null,
    ];

    return (
        <div css={styles.root}>
            {background === 'GLASS' && (
                <BlobGlassBackground
                    childrenInFront={false}
                    customCss={{ borderRadius: 'var(--borderRadius-medium)' }}
                />
            )}

            <Card onClick={!editMode ? onClick : undefined} customCss={[...cardStyle, ...(customCss ? (Array.isArray(customCss) ? customCss : [customCss]) : [])]}>
                <div css={styles.content}>{children}</div>
            </Card>

            {editMode && (
                <div css={styles.editBar}>
                    <DropdownMenu
                        triggerIconColor="--color-white"
                        triggerSelectedBg="color-mix(in srgb, var(--color-gray) 15%, transparent)"
                        items={[
                            { label: 'Resize', icon: <PiResizeBold />, iconColor: 'info',   onClick: onResize ?? (() => {}) },
                            { label: 'Edit',   icon: <RiEdit2Fill />,  iconColor: 'info',   onClick: () => {} },
                            { label: 'Delete', icon: <FaTrashAlt />,   iconColor: 'danger', onClick: onDelete ?? (() => {}) },
                        ]}
                    />
                </div>
            )}
        </div>
    );
};

export default Widget;
