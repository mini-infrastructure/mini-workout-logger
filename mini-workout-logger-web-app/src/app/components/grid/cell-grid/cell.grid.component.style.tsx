import { css } from '@emotion/react';

const styles = {
    cell: (editMode: boolean, occupied: boolean, isDropTarget = false) => css({
        height: '100%',
        position: 'relative',
        borderRadius: 'var(--borderRadius-small)',
        boxSizing: 'border-box',
        border: editMode
            ? '2px solid var(--color-border)'
            : 'none',
        backgroundColor: isDropTarget
            ? 'color-mix(in srgb, var(--color-blue) 20%, transparent)'
            : editMode ? 'var(--color-container1)' : 'transparent',
        cursor: editMode && !occupied ? 'pointer' : 'default',
        transition: 'background-color 0.15s',

        ...(editMode && !occupied && {
            ':hover': {
                backgroundColor: 'color-mix(in srgb, var(--color-blue) 10%, transparent)',
            },
            ':hover .cell-add-icon': {
                opacity: 1,
            },
        }),
    }),
};

export default styles;
