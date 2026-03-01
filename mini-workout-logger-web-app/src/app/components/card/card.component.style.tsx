import { css, Theme, keyframes } from "@emotion/react";
import { transparentize } from "polished";

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
    baseCard: (theme: Theme) => css({
        position: "relative",
        overflow: "hidden",
        borderRadius: 15,
        padding: "2rem",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        backgroundColor: transparentize(0.6, theme.colors.container1),
        border: `1px solid ${transparentize(0.8, theme.colors.border1)}`,
    }),

    /**
     * Blob card.
     */

    blobCard: (random: RandomValues) => (theme: Theme) => {
        const second = {
            top: 100 - random.top,
            left: 100 - random.left,
        };

        return css({
            "&::before": {
                content: '""',
                position: "absolute",
                width: random.size1,
                height: random.size1,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                filter: "blur(70px)",
                top: `${random.top}%`,
                left: `${random.left}%`,
                transform: "translate(-50%, -50%)",
                animation: `${float} 8s ease-in-out infinite`,
                zIndex: -1,
            },

            "&::after": {
                content: '""',
                position: "absolute",
                width: random.size2,
                height: random.size2,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.primary})`,
                filter: "blur(60px)",
                top: `${second.top}%`,
                left: `${second.left}%`,
                transform: "translate(-50%, -50%)",
                animation: `${float} 10s ease-in-out infinite`,
                animationDelay: "2s",
                zIndex: -1,
            },
        });
    },

    /**
     * Label card.
     */

    labelCard: (theme: Theme) => css({
        position: 'relative',
        borderRadius: '0 0 0.75rem 0.75rem',
        strokeLinejoin: 'round',
        padding: '1.25rem 1rem',
        boxShadow: `0 4px 6px ${transparentize(0.95, theme.colors.black)}`,
        overflow: 'visible',

        '&:hover .label-bar': {
            transform: 'translateY(-100%)',
            height: '1.2rem',
            borderRadius: '0.75rem 0.75rem 0 0',
        },

        '& .label-button': {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: '100%',
        },
    }),

    header: css({
        fontWeight: 700,
    }),

    label: (theme: Theme) => css({
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: '100%',
        backgroundColor: theme.colors.primary,
        height: '0.5rem',
        transition: 'transform 0.2s ease',
    }),

    labelButton: (theme: Theme) => css({
        backgroundColor: 'transparent',
        height: '100%',
        color: theme.colors.white,
        border: 'none',
        cursor: 'pointer',
         '&:hover': {
             color: theme.colors.white,
             backgroundColor: transparentize(0.8, theme.colors.white),
         },
    }),

};

export default styles;