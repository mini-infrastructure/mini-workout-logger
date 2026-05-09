import {css} from '@emotion/react';

export type BallProps = {
    color: string;
    on?: boolean;
    size?: string;
};

const Ball = ({ color, on = false, size = '8px' }: BallProps) => (
    <span css={css({
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        flexShrink: 0,
        backgroundColor: on ? color : 'var(--color-border)',
        transition: 'background-color 0.15s ease',
    })} />
);

export default Ball;
