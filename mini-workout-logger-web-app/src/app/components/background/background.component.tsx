import type { CSSProperties, PropsWithChildren } from 'react';
import type { Interpolation, Theme } from '@emotion/react';
import styles from './background.component.style.tsx';

export type BackgroundProps = {
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
    style?: CSSProperties;
    childrenInFront?: boolean;
};

const Background = ({
    customCss,
    style,
    childrenInFront = true,
    children,
}: PropsWithChildren<BackgroundProps>) => (
    <div
        css={[
            styles.base,
            ...(customCss ? (Array.isArray(customCss) ? customCss : [customCss]) : []),
        ]}
        style={style}
    >
        {childrenInFront
            ? children
            : children && <div css={styles.behind}>{children}</div>
        }
    </div>
);

export default Background;
