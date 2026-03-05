import {css, Theme} from "@emotion/react";
import {darken, invert, transparentize} from "polished";

const styles = {
    badge: (theme: Theme) => css({
        fontFamily: theme.fonts.number,
        lineHeight: ' 1.25rem',
        padding: '2px .5rem',
        borderRadius: 15,
        cursor: 'pointer',
        outline: 'none',
        border: 'none',
        backgroundColor: theme.colors.container2,
        display: 'inline-flex',
        alignItems: 'center',
    }),

    icon: css({
        marginRight: '0.4rem',
        '& svg': {
            display: 'block',
        }
    }),

    removeButton: (theme: Theme) => css({
        backgroundColor: 'transparent',
        padding: '0.2rem',
        ':hover': {
            backgroundColor: 'transparent',
        },
    }),

    grayBadge: (theme: Theme) => {
        const baseColor = theme.colors.border1;

        return css({
            backgroundColor: baseColor,
            color: theme.colors.text,
            transition: 'all 0.2s ease',

            '&:hover': {
                backgroundColor: theme.colors.border2,
                color: invert(theme.colors.text),
                '& button': {
                    color: invert(theme.colors.text),
                }
            },

            '& button': {
                color: theme.colors.text,
            }
        });
    },

    primaryBadge: (theme: Theme) => {
        const baseColor = theme.colors.primary;

        return css({
            backgroundColor: transparentize(0.9, baseColor),
            color: darken(0.2, baseColor),
            transition: 'all 0.2s ease',

            '&:hover': {
                backgroundColor: transparentize(0.35, baseColor),
                color: theme.colors.white,

                '& button': {
                    color: theme.colors.white,
                }
            },

            '& button': {
                color: darken(0.2, baseColor),
            }
        });
    },

    dangerBadge: (theme: Theme) => {
        const baseColor = theme.colors.red;

        return css({
            backgroundColor: transparentize(0.8, baseColor),
            color: darken(0.2, baseColor),
            transition: 'all 0.2s ease',

            '&:hover': {
                backgroundColor: transparentize(0.2, baseColor),
                color: theme.colors.white,
                '& button': {
                    color: theme.colors.white,
                }
            },

            '& button': {
                color: darken(0.2, baseColor),
            }
        });
    },

    warningBadge: (theme: Theme) => {
        const baseColor = theme.colors.yellow;

        return css({
            backgroundColor: transparentize(0.9, baseColor),
            color: darken(0.1, baseColor),
            transition: 'all 0.2s ease',

            '&:hover': {
                backgroundColor: transparentize(0.2, baseColor),
                color: theme.colors.white,
                '& button': {
                    color: theme.colors.white,
                }
            },

            '& button': {
                color: darken(0.1, baseColor),
            }
        });
    },

    successBadge: (theme: Theme) => {
        const baseColor = theme.colors.green;

        return css({
            backgroundColor: transparentize(0.9, baseColor),
            color: baseColor,
            transition: 'all 0.2s ease',

            '&:hover': {
                backgroundColor: transparentize(0.35, baseColor),
                color: theme.colors.white,
                '& button': {
                    color: theme.colors.white,
                }
            },

            '& button': {
                color: baseColor,
            }
        });
    },

    pinkBadge: (theme: Theme) => {
        const baseColor = theme.colors.pink;

        return css({
            backgroundColor: transparentize(0.9, baseColor),
            color: baseColor,
            transition: 'all 0.2s ease',

            '&:hover': {
                backgroundColor: transparentize(0.3, baseColor),
                color: theme.colors.white,
                '& button': {
                    color: theme.colors.white,
                }
            },

            '& button': {
                color: baseColor,
            }
        });
    },

    purpleBadge: (theme: Theme) => {
        const baseColor = theme.colors.purple;

        return css({
            backgroundColor: transparentize(0.9, baseColor),
            color: baseColor,
            transition: 'all 0.2s ease',

            '&:hover': {
                backgroundColor: baseColor,
                color: theme.colors.white,
                '& button': {
                    color: theme.colors.white,
                }
            },

            '& button': {
                color: baseColor,
            }
        });
    },

    orangeBadge: (theme: Theme) => {
        const baseColor = theme.colors.orange;

        return css({
            backgroundColor: transparentize(0.9, baseColor),
            color: baseColor,
            transition: 'all 0.2s ease',

            '&:hover': {
                backgroundColor: baseColor,
                color: theme.colors.white,
                '& button': {
                    color: theme.colors.white,
                }
            },

            '& button': {
                color: baseColor,
            }
        });
    },

};

export default styles;