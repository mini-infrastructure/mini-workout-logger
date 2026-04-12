import {css, keyframes} from "@emotion/react";

export type RandomValues = {
    top: number;
    left: number;
    size1: number;
    size2: number;
};

const float = keyframes`
    0%   { transform: translate(-50%, -50%) translate(0px, 0px); }
    50%  { transform: translate(-50%, -50%) translate(20px, -15px); }
    100% { transform: translate(-50%, -50%) translate(0px, 0px); }
`;

const styles = {
    baseCard: (clicked: boolean) => css({
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'var(--borderRadius-medium)',
        padding: 'var(--base-size-16)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        backgroundColor: 'var(--color-container1)',
        border: 'var(--borderWidth-thin) solid color-mix(in srgb, var(--color-border) 20%, transparent)',
        cursor: clicked ? 'pointer' : 'default',
    }),

    /**
     * Blob card.
     */

    blobCard: (random: RandomValues) => {
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
                background: 'linear-gradient(135deg, var(--color-blue), var(--color-blue-border))',
                filter: 'blur(70px)',
                top: `${random.top}%`,
                left: `${random.left}%`,
                transform: 'translate(-50%, -50%)',
                animation: `${float} 8s ease-in-out infinite`,
                zIndex: -1,
            },

            '&::after': {
                content: '""',
                position: 'absolute',
                width: random.size2,
                height: random.size2,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-blue-border), var(--color-blue))',
                filter: 'blur(60px)',
                top: `${second.top}%`,
                left: `${second.left}%`,
                transform: 'translate(-50%, -50%)',
                animation: `${float} 10s ease-in-out infinite`,
                animationDelay: '2s',
                zIndex: -1,
            },
        });
    },

};

export default styles;
