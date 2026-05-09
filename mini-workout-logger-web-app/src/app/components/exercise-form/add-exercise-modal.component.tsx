import {css} from '@emotion/react';
import Modal from '../modal/modal.component.tsx';
import ExerciseForm from './exercise-form.component.tsx';
import type {ExerciseWriteDTO} from '../../dtos/exercise-write.dto.tsx';
import ExerciseService from '../../services/exercise.service.tsx';
import {useAlert} from '../../context/alert.context.tsx';

type AddExerciseModalProps = {
    open: boolean;
    onClose: () => void;
    onCreated?: () => void;
};

const modalCss = css({ minWidth: '50vw', maxWidth: '65vw' });

const AddExerciseModal = ({ open, onClose, onCreated }: AddExerciseModalProps) => {
    const pushAlert = useAlert();

    const handleSubmit = async (payload: ExerciseWriteDTO, coverFile?: File) => {
        try {
            const created = await ExerciseService.create(payload);
            if (coverFile) {
                await ExerciseService.uploadMedia(created.id, coverFile, 'COVER');
            }
            pushAlert('Exercise created successfully.', 'success');
            onClose();
            onCreated?.();
        } catch (error) {
            pushAlert(error instanceof Error ? error.message : 'An error occurred.', 'error');
        }
    };

    return (
        <Modal open={open} onClose={onClose} customCss={modalCss}>
            <ExerciseForm onSubmit={handleSubmit} />
        </Modal>
    );
};

export default AddExerciseModal;
