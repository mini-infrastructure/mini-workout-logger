import {useState} from 'react';
import type {Interpolation, Theme} from '@emotion/react';
import styles from './legends.component.style.tsx';

export type LegendItem = {
    key: string;
    label: string;
    color: string;
    /** When provided, legends become interactive (cumulative toggle). */
    onClick?: (key: string, selectedKeys: string[]) => void;
};

export type LegendsProps = {
    items: LegendItem[];
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

/**
 * Renders a row of dot + label legends.
 *
 * Interaction model (when any item has `onClick`):
 * - Clicking an unselected item selects it exclusively (all others dim).
 * - Clicking the already-selected item deselects it (all return to full opacity).
 */
const Legends = ({ items, customCss }: LegendsProps) => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

    const isClickable = items.some((i) => i.onClick !== undefined);

    const handleClick = (item: LegendItem) => {
        if (!item.onClick) return;
        const next = new Set(selectedKeys);
        next.has(item.key) ? next.delete(item.key) : next.add(item.key);
        setSelectedKeys(next);
        item.onClick(item.key, [...next]);
    };

    return (
        <div css={[styles.container, customCss]}>
            {items.map((item) => {
                const selected = !isClickable || selectedKeys.size === 0 || selectedKeys.has(item.key);
                return (
                    <div
                        key={item.key}
                        css={styles.item(isClickable, selected)}
                        onClick={() => handleClick(item)}
                    >
                        <span css={styles.dot} style={{ backgroundColor: item.color }} />
                        <span css={styles.label}>{item.label}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default Legends;
