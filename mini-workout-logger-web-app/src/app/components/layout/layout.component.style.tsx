import {css} from '@emotion/react';

const NAVBAR_HEIGHT = 'var(--base-size-64)';
const BORDER = `var(--borderWidth-thin) solid var(--color-border)`;

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

    sidebar: css({
        width: 'fit-content',
        minWidth: 'var(--layout-sidebar-minWidth)',
        display: 'flex',
        flexDirection: 'column',
        borderRight: BORDER,
        backgroundColor: 'var(--color-container1)',
    }),

    sidebarTopDivider: css({
        height: NAVBAR_HEIGHT,
        minHeight: NAVBAR_HEIGHT,
        borderBottom: BORDER,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `0 var(--overlay-padding-condensed)`,
    }),

    sidebarHeader: css({
        textTransform: 'uppercase',
        fontSize: 'var(--size-small)',
        color: 'var(--color-text)',
        fontFamily: 'var(--font-number)',
        padding: `var(--base-size-8) 0`,
    }),

    sidebarContent: css({
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-nano)',
        padding: `var(--base-size-8) var(--overlay-padding-condensed)`,
    }),

    contentArea: css({
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minWidth: 0,
    }),

    mainContent: css({
        flex: 1,
        padding: 'var(--base-size-16)',
        overflowY: 'auto',
        backgroundColor: 'var(--color-bg)',
    }),

    /**
     * Navbar.
     */

    navbar: css({
        height: NAVBAR_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `0 var(--stack-gap-spacious)`,
        borderBottom: BORDER,
        backgroundColor: 'var(--color-container1)',
    }),

    main: css({
        flex: 1,
        padding: 'var(--base-size-32)',
        overflowY: 'auto',
    }),

    navbarRight: css({
        display: 'flex',
        flexDirection: 'row',
    }),

    breadcrumb: css({
        display: 'flex',
        alignItems: 'center',
        fontSize: 'var(--size-large)',
    }),

    breadcrumbItem: css({}),

    breadcrumbInactive: css({
        color: 'var(--color-border)',
    }),

    breadcrumbSeparator: css({
        margin: '0 0.4rem',
        color: 'var(--color-border)',
    }),
};

export default styles;
