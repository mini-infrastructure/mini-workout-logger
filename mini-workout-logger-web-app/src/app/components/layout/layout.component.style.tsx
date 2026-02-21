import { css, Theme } from '@emotion/react';

const NAVBAR_HEIGHT = '8vh';

const styles = {
    wrapper: (theme: Theme) => css({
        width: '100%',
        height: '100vh',
        display: 'flex',
        color: theme.colors.surfaceText,
    }),

    sidebar: (theme: Theme) => css({
        width: '13vw',
        display: 'flex',
        flexDirection: 'column',
        borderRight: `1px solid ${theme.colors.border}`,
        backgroundColor: theme.colors.body,
    }),

    sidebarTopDivider: (theme: Theme) => css({
        height: NAVBAR_HEIGHT,
        borderBottom: `1px solid ${theme.colors.border}`,
    }),

    sidebarContent: css({
        flex: 1,
        padding: '1rem 0.6rem',
        display: 'flex',
        flexDirection: 'column',
    }),

    contentArea: css({
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    }),

    navbar: (theme: Theme) => css({
        height: NAVBAR_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        borderBottom: `1px solid ${theme.colors.border}`,
        backgroundColor: theme.colors.body,
    }),

    navbarActions: css({
        display: 'flex',
        gap: '1.5rem',
    }),

    main: css({
        flex: 1,
        padding: '2rem',
        overflowY: 'auto',
    }),
};

export default styles;
