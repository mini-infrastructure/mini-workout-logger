import type {Interpolation, Theme} from '@emotion/react';
import styles from "./index.style.tsx";

export type DividerProps = {
    thickness?: 'thin' | 'medium' | 'thick';
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const thicknessMap = {
    thin: 'var(--borderWidth-thin)',
    medium: 'var(--base-size-2)',
    thick: 'var(--base-size-4)',
};

const Divider = ({
                     thickness = 'thin',
                     customCss,
                 }: DividerProps) => {
    return (
        <hr
            css={[
                styles.divider,
                { borderTopWidth: thicknessMap[thickness] },
                customCss,
            ]}
        />
    );
};

export default Divider;
