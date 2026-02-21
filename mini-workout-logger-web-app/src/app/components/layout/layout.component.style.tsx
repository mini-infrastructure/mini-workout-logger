import { css, Theme } from '@emotion/react';

const NAVBAR_HEIGHT = '8vh';

const styles = {
    wrapper: (theme: Theme) => css({
        width: '100%',
        height: '100vh',
        display: 'flex',
        color: theme.colors.surfaceText,
    }),

    /**
     * Sidebar.
     */

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

    sidebarHeader: (theme: Theme) => css({
        margin: '0.6rem 0.6rem',
        textTransform: 'uppercase',
        fontSize: '0.8rem',
        color: theme.colors.surfaceTextLighter,
        fontFamily: theme.fonts.number,
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

    /**
     * Navbar.
     */

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
