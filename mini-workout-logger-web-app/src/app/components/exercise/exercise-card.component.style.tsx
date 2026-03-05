import {css} from '@emotion/react';

const styles = {

    cardWrapper: css({
        padding: '0.6rem',
    }),

    /**
     * Header.
     */

    nameIconWrapper: css({
        display: 'flex',
        alignItems: 'center',
    }),

    /**
     * Card body.
     */

    session: css({
        margin: '0.75rem 0',
    }),

    sessionHeader: css({
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            marginRight: '0.5rem',
            minWidth: '2rem',
        }
    }),

    badgesWrapper: css({
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }),

};

export default styles;
