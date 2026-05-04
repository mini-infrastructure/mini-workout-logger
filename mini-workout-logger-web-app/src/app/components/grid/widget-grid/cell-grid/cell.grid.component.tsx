import styles from './cell.grid.component.style.tsx';

export type CellGridProps = {
    editMode: boolean;
    occupied: boolean;
    isDropTarget?: boolean;
    onClick?: () => void;
};

const CellGrid = ({ editMode, occupied, isDropTarget = false, onClick }: CellGridProps) => {
    return (
        <div
            css={styles.cell(editMode, occupied, isDropTarget)}
            onClick={editMode && !occupied ? onClick : undefined}
        />
    );
};

export default CellGrid;
