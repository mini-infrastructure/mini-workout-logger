import type {Interpolation, Theme} from '@emotion/react';
import styles from "./divider.component.style.tsx";

export type DividerProps = {
    thickness?: 'thin' | 'medium' | 'thick';
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const thicknessMap = {
    thin: 'px',
    medium: '2px',
    thick: '4px',
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
