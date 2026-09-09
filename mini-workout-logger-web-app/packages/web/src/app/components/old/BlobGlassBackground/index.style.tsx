import { css, keyframes } from '@emotion/react';
import type { Keyframes } from '@emotion/react';

export type RandomValues = {
    top: number;
    left: number;
    size1: number;
    size2: number;
};

export const floatAnimation = keyframes`
    0%   { transform: translate(-50%, -50%) translate(0px, 0px); }
    50%  { transform: translate(-50%, -50%) translate(20px, -15px); }
    100% { transform: translate(-50%, -50%) translate(0px, 0px); }
`;

const styles = {
    /**
     * Two blobs at random positions, animated when animation is provided.
     */
    dual: (color: string, random: RandomValues, animation?: Keyframes) => {
        const second = {
            top: 100 - random.top,
            left: 100 - random.left,
        };

        return css({
            '&::before': {
                content: '""',
                position: 'absolute',
                width: random.size1,
                height: random.size1,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 60%, transparent))`,
                filter: 'blur(70px)',
                top: `${random.top}%`,
                left: `${random.left}%`,
                transform: 'translate(-50%, -50%)',
                animation: animation ? `${animation} 8s ease-in-out infinite` : undefined,
                zIndex: -1,
            },
            '&::after': {
                content: '""',
                position: 'absolute',
                width: random.size2,
                height: random.size2,
                borderRadius: '50%',
                background: `linear-gradient(135deg, color-mix(in srgb, ${color} 60%, transparent), ${color})`,
                filter: 'blur(60px)',
                top: `${second.top}%`,
                left: `${second.left}%`,
                transform: 'translate(-50%, -50%)',
                animation: animation ? `${animation} 10s ease-in-out infinite` : undefined,
                animationDelay: animation ? '2s' : undefined,
                zIndex: -1,
            },
        });
    },

    /**
     * Single centered blob. Used for small contexts like icon buttons.
     */
    single: (color: string, animation?: Keyframes) => css({
        '&::before': {
            content: '""',
            position: 'absolute',
            width: '45%',
            height: '45%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${color}, color-mix(in srgb, ${color} 30%, transparent))`,
            filter: 'blur(8px)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: animation ? `${animation} 6s ease-in-out infinite` : undefined,
            zIndex: -1,
        },
    }),
};

export default styles;
