import {css} from "@emotion/react";

const styles = {
    container: css({
        position: 'relative',
        display: 'inline-block',
    }),

    menu: (top, left) => css({
        position: 'fixed',
        top: top,
        left: left,
        transform: "translateX(-100%)",
        zIndex: 'var(--base-zIndex-overlay)' as any,
        background: "var(--color-container1)",
        borderRadius: 'var(--overlay-borderRadius)',
        boxShadow: "var(--shadow-normal)",
        padding: 'var(--overlay-padding-condensed)',
        width: 'max-content',
        minWidth: 'var(--overlay-minWidth)',
    }),

    legend: css({
        textTransform: 'uppercase',
        fontSize: "var(--size-small)",
        fontFamily: "var(--font-number)",
        padding: `0 0 var(--base-size-8) 0`,
    }),

    ul: css({
        listStyle: 'none',
        margin: 0,
        padding: 0,
    }),

    menuButton: css({
        width: '100%',
        height: 'var(--base-size-24)',
        justifyContent: 'flex-start',
        fontFamily: "var(--font-number)",
        borderRadius: 'var(--borderRadius-medium)',
        padding: `0 var(--base-size-8)`,

        ':hover': {
            backgroundColor: "var(--color-border)",
            color: "var(--color-white)",
            '& svg': {
                color: "var(--color-white)",
            },
        },
    }),
};

export default styles;
