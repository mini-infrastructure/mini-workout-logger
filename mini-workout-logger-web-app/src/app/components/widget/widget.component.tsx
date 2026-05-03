import type { JSX } from '@emotion/react/jsx-runtime';
import type { Interpolation, Theme } from '@emotion/react';
import { FaTrashAlt } from 'react-icons/fa';
import { MdDragIndicator } from 'react-icons/md';
import { PiResizeBold } from 'react-icons/pi';
import { RiEdit2Fill } from 'react-icons/ri';
import Card from '../card/card.component.tsx';
import OnlyIconButton from '../button/only-icon-button.component.tsx';
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
    dragHandleProps?: { onMouseDown: () => void; onMouseUp: () => void };
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
    dragHandleProps,
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

            <Card onClick={!editMode ? onClick : undefined} customCss={[cardStyle, customCss]}>
                <div css={styles.content}>{children}</div>
            </Card>

            {editMode && (
                <div css={styles.editBar}>
                    <OnlyIconButton
                        icon={<MdDragIndicator />}
                        iconColor="--color-gray"
                        legend="Drag"
                        onToggle={() => {}}
                        customCss={{ cursor: 'grab' }}
                        {...(dragHandleProps ?? {})}
                    />
                    <DropdownMenu
                        items={[
                            { label: 'Resize', icon: <PiResizeBold />, iconColor: 'var(--color-text)', onClick: onResize ?? (() => {}) },
                            { label: 'Edit',   icon: <RiEdit2Fill />,  iconColor: 'var(--color-text)', onClick: () => {} },
                            { label: 'Delete', icon: <FaTrashAlt />,   iconColor: 'var(--color-red)',  onClick: onDelete ?? (() => {}) },
                        ]}
                    />
                </div>
            )}
        </div>
    );
};

export default Widget;
