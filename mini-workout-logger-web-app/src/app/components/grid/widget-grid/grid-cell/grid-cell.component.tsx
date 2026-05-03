import { MdAddBox } from 'react-icons/md';
import styles from './grid-cell.component.style.tsx';
import Container from "../../../container/container.component.tsx";

export type GridCellProps = {
    editMode: boolean;
    occupied: boolean;
    isDropTarget?: boolean;
    onClick?: () => void;
};

const GridCell = ({ editMode, occupied, isDropTarget = false, onClick }: GridCellProps) => {
    return (
        <div
            css={styles.cell(editMode, occupied, isDropTarget)}
            onClick={editMode && !occupied ? onClick : undefined}
        >
        </div>
    );
};

export default GridCell;
