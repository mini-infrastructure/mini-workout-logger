import {css} from "@emotion/react";

const styles = {
    badgeContainer: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-normal)',
        padding: 'var(--base-size-16)',
        backgroundColor: 'var(--color-container1)',
    }),

    badgeGroup: css({
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--stack-gap-condensed)',
        alignItems: 'center',
    }),
};

export default styles;
