import {useState} from 'react';
import {MdEdit, MdEditOff} from 'react-icons/md';
import DrawerModal from '../drawer-modal/drawer-modal.component.tsx';
import Button from '../button/button.component.tsx';
import type {ExerciseReadDTO} from '../../dtos/exercise-read.dto.tsx';
import type {ExerciseWriteDTO} from '../../dtos/exercise-write.dto.tsx';
import ExerciseService from '../../services/exercise.service.tsx';
import {useAlert} from '../../context/alert.context.tsx';
import ExerciseForm from '../exercise-form/exercise-form.component.tsx';
import styles from './exercise-drawer.component.style.tsx';

export type ExerciseDrawerProps = {
    exercise: ExerciseReadDTO;
    open: boolean;
    onClose: () => void;
};

const ExerciseDrawer = ({ exercise, open, onClose }: ExerciseDrawerProps) => {
    const [editMode, setEditMode] = useState(false);
    const pushAlert = useAlert();

    const handleCoverUpload = async (file: File) => {
        await ExerciseService.uploadMedia(exercise.id, file, 'COVER');
        pushAlert('Cover image updated.', 'success');
    };

    const handleClose = () => {
        setEditMode(false);
        onClose();
    };

    const handleSubmit = async (payload: ExerciseWriteDTO, _coverFile?: File) => {
        try {
            await ExerciseService.update(exercise.id, payload);
            pushAlert('Exercise updated successfully.', 'success');
            setEditMode(false);
        } catch (error) {
            pushAlert(error instanceof Error ? error.message : 'An error occurred.', 'error');
        }
    };

    const editButton = (
        <Button
            icon={<MdEdit />}
            clickedIcon={<MdEditOff />}
            isClicked={editMode}
            onClick={() => setEditMode((prev) => !prev)}
            noBorder
            customCss={styles.editButton}
            customIconCss={styles.editBButtonIcon}
        />
    );

    return (
        <DrawerModal open={open} onClose={handleClose} headerButton={editButton}>
            <div css={styles.container}>
                <ExerciseForm
                    key={exercise.id}
                    exercise={exercise}
                    disabled={!editMode}
                    onSubmit={handleSubmit}
                    onCoverUpload={handleCoverUpload}
                />
            </div>
        </DrawerModal>
    );
};

export default ExerciseDrawer;
