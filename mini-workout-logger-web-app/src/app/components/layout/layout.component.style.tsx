import { css, Theme } from '@emotion/react';

const NAVBAR_HEIGHT = '4rem';

const styles = {
    wrapper: css({
        width: '100%',
        height: '100vh',
        display: 'flex',
        overflow: 'hidden',
    }),

    /**
     * Sidebar.
     */

    sidebar: (theme: Theme) => css({
        width: 'fit-content',
        minWidth: '16rem',
        display: 'flex',
        flexDirection: 'column',
        borderRight: `1px solid ${theme.colors.border1}`,
        backgroundColor: theme.colors.background,
    }),

    sidebarTopDivider: (theme: Theme) => css({
        height: NAVBAR_HEIGHT,
        minHeight: NAVBAR_HEIGHT,
        borderBottom: `1px solid ${theme.colors.border1}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 0.75rem',
    }),

    sidebarHeader: (theme: Theme) => css({
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.small,
        color: theme.colors.text2,
        fontFamily: theme.fonts.number,
        padding: '0.5rem 0',
    }),

    sidebarContent: css({
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
        padding: '0.5rem 0.75rem',
    }),

    contentArea: css({
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    }),

    mainContent: (theme: Theme) => css({
        flex: 1,
        padding: '1rem',
        overflowY: 'auto',
        backgroundColor: theme.colors.background,
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
        borderBottom: `1px solid ${theme.colors.border1}`,
        backgroundColor: theme.colors.background,
    }),

    main: css({
        flex: 1,
        padding: '2rem',
        overflowY: 'auto',
    }),

    breadcrumb: (theme: Theme) => css({
        display: "flex",
        alignItems: "center",
        fontSize: theme.fontSizes.large,
    }),

    breadcrumbItem: (theme: Theme) => css({
    }),

    breadcrumbInactive: (theme: Theme) => css({
        color: theme.colors.text2,
    }),

    breadcrumbSeparator: (theme: Theme) => css({
        margin: "0 0.4rem",
        color: theme.colors.text2,
    }),

};

export default styles;
