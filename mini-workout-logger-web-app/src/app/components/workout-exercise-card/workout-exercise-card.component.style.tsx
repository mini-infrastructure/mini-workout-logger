import { css } from '@emotion/react';

const COVER_SIZE = 96;

const styles = {
    coverSize: COVER_SIZE,

    cover: css({
        height: 'var(--base-size-96)',
        width: 'var(--base-size-96)',
        flexShrink: 0,
        alignSelf: 'flex-start',
    }),

    container: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-normal)',
        minWidth: 0,
    }),

    header: css({
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--stack-gap-condensed)',
        minHeight: 'var(--base-size-96)',
    }),

    dragHandle: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: 'none',
        padding: 'var(--base-size-4)',
        borderRadius: 'var(--borderRadius-small)',
        color: 'var(--color-border)',
        cursor: 'grab',
        flexShrink: 0,
        alignSelf: 'flex-start',
        marginTop: 'calc(-1 * var(--base-size-4))',

        ':hover': {
            color: 'var(--color-white)',
            background: 'transparent',
        },

        ':active': {
            cursor: 'grabbing',
        },
    }),

    dragHandleIcon: css({
        width: '22px',
        height: '22px',
        fontSize: '22px',
    }),

    exerciseInfo: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-condensed)',
        flex: 1,
        minWidth: 0,
    }),

    exerciseInfoTop: css({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 'var(--stack-gap-condensed)',
    }),

    nameAndBadges: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-condensed)',
        flex: 1,
        minWidth: 0,
    }),

    exerciseButtons: css({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 0,
    }),

    exerciseName: css({
        fontWeight: 600,
        fontSize: 'var(--size-medium)',
    }),

    muscles: css({
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--stack-gap-condensed)',
    }),

    notesWrapper: css({
        position: 'relative',
        width: '100%',
    }),

    notesTextarea: css({
        width: '100%',
        boxSizing: 'border-box' as const,
        padding: '0.4rem 0.6rem',
        borderRadius: 'var(--borderRadius-small)',
        backgroundColor: 'var(--color-container2)',
        border: 'none',
        fontSize: 'var(--size-input-text)',
        color: 'var(--color-text)',
        resize: 'none' as const,
        outline: 'none',
        maxHeight: 'calc(5 * 1.5em + 0.8rem)',
        overflowY: 'auto' as const,
        lineHeight: 1.5,
        display: 'block',
        transition: 'height var(--transition-expand)',
        ':focus': {
            outline: 'var(--borderWidth-thin) solid var(--color-blue)',
        },
    }),

    notesPlaceholder: css({
        position: 'absolute',
        top: '0.4rem',
        left: '0.6rem',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-condensed)',
        fontSize: 'var(--size-input-text)',
        color: 'var(--color-gray)',
        pointerEvents: 'none' as const,
        userSelect: 'none' as const,
    }),

    notesPlaceholderIcon: css({
        flexShrink: 0,
        fontSize: 'var(--size-input-text)',
    }),

    swapPanelWrapper: css({
        overflow: 'hidden',
        transition: 'max-height var(--transition-expand)',
    }),

    swapPanel: css({
        display: 'block',
        minWidth: 0,
        paddingTop: 'var(--stack-gap-normal)',
    }),

    // Outer scroll container — plain block, no flex. Width = parent content
    // width via normal block layout. overflow-x:auto scrolls when the inner
    // row (swapCardsRow) is wider than this container.
    swapScrollArea: css({
        overflowX: 'auto',
        marginBottom: 'var(--stack-gap-condensed)',
        paddingBottom: 'var(--base-size-4)',
        '&::-webkit-scrollbar': { height: 'var(--base-size-4)' },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--color-border)',
            borderRadius: 'var(--borderRadius-full)',
        },
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--color-border) transparent',
    }),

    // Inner flex row — width:max-content makes the browser compute the true
    // total width of all cards. The outer scroll area sees a child wider than
    // itself and renders the horizontal scrollbar.
    swapCardsRow: css({
        display: 'flex',
        flexWrap: 'nowrap',
        width: 'max-content',
        gap: 'var(--stack-gap-condensed)',
    }),

    // Wrapper owns the fixed width and the colored border.
    // Using border (box model) rather than outline/box-shadow avoids any
    // overflow-clipping issues. box-sizing:border-box keeps total width
    // exactly var(--base-size-260) including the border.
    swapCardWrapper: (exactMatch: boolean) => css({
        flexShrink: 0,
        width: 'var(--base-size-260)',
        boxSizing: 'border-box',
        border: 'var(--borderWidth-medium) solid transparent',
        borderRadius: 'var(--borderRadius-medium)',
        cursor: 'pointer',
        transition: 'border-color 0.15s',
        ':hover': {
            borderColor: exactMatch ? 'var(--color-green)' : 'var(--color-yellow)',
        },
    }),

    swapLegend: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-condensed)',
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
    }),

    swapEmpty: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
    }),
};

export default styles;
