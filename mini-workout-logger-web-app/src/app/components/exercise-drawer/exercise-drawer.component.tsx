import { useState } from 'react';
import { MdEdit, MdEditOff } from 'react-icons/md';
import DrawerModal from '../drawer-modal/drawer-modal.component.tsx';
import FormBuilder from '../input/form/form.input.component.tsx';
import type { FormItem, FormFieldValue } from '../input/form/form.input.component.tsx';
import Divider from '../divider/divider.component.tsx';
import Button from '../button/button.component.tsx';
import type { ExerciseReadDTO } from '../../dtos/exercise-read.dto.tsx';
import type { ExerciseWriteDTO } from '../../dtos/exercise-write.dto.tsx';
import type { ExerciseMuscleWriteDTO } from '../../dtos/exercise-muscle-write.dto.tsx';
import ExerciseService from '../../services/exercise.service.tsx';
import { useMuscles } from '../../hooks/useMuscles.tsx';
import { useAlert } from '../../context/alert.context.tsx';
import {
    exerciseCategoryOptions,
    exerciseDifficultyOptions,
    exerciseEquipmentOptions,
    exerciseForceOptions,
    exerciseMechanicsOptions,
    exerciseRoleOptions,
    exerciseTypeOptions,
} from '../../models/exercise.model.tsx';
import styles from './exercise-drawer.component.style.tsx';

export type ExerciseDrawerProps = {
    exercise: ExerciseReadDTO;
    open: boolean;
    onClose: () => void;
};

const buildFormItems = (exercise: ExerciseReadDTO, muscleOptions: { label: string; value: string }[]): FormItem[] => [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        initialValue: exercise.name ?? '',
    },
    {
        name: 'category',
        label: 'Category',
        type: 'select',
        options: exerciseCategoryOptions,
        initialValue: exercise.category ?? '',
    },
    {
        name: 'difficulty',
        label: 'Difficulty',
        type: 'select',
        options: exerciseDifficultyOptions,
        initialValue: exercise.difficulty ?? '',
    },
    {
        name: 'equipment',
        label: 'Equipment',
        type: 'select',
        options: exerciseEquipmentOptions,
        initialValue: exercise.equipment ?? '',
    },
    {
        name: 'force',
        label: 'Force',
        type: 'select',
        options: exerciseForceOptions,
        initialValue: exercise.force ?? '',
    },
    {
        name: 'mechanics',
        label: 'Mechanics',
        type: 'select',
        options: exerciseMechanicsOptions,
        initialValue: exercise.mechanics ?? '',
    },
    {
        name: 'type',
        label: 'Type',
        type: 'select',
        options: exerciseTypeOptions,
        initialValue: exercise.type ?? '',
    },
    {
        name: 'role',
        label: 'Role',
        type: 'select',
        options: exerciseRoleOptions,
        initialValue: exercise.role ?? '',
    },
    {
        name: 'group_name',
        label: 'Group',
        type: 'text',
        initialValue: exercise.group_name ?? '',
        colSpan: 2,
    },
    {
        name: 'muscles',
        label: 'Muscles',
        type: 'multiselect',
        options: muscleOptions,
        initialValue: exercise.exercise_muscles?.map((m) => m.muscle_name) ?? [],
        colSpan: 2,
    },
];

const ExerciseDrawer = ({ exercise, open, onClose }: ExerciseDrawerProps) => {
    const [editMode, setEditMode] = useState(false);
    const { muscles } = useMuscles();
    const pushAlert = useAlert();

    const muscleOptions = muscles.map((m) => ({ label: m.name, value: m.name }));

    const handleClose = () => {
        setEditMode(false);
        onClose();
    };

    const handleSubmit = async (values: Record<string, FormFieldValue>) => {
        const selectedMuscleNames = values.muscles as string[];

        const exercise_muscles: ExerciseMuscleWriteDTO[] = selectedMuscleNames
            .flatMap((name) => {
                const muscle = muscles.find((m) => m.name === name);
                return muscle ? [{ muscle_id: muscle.id, role: 'TARGET' as const }] : [];
            });

        const payload: ExerciseWriteDTO = {
            name: values.name as string,
            category: (values.category as ExerciseWriteDTO['category']) || undefined,
            difficulty: (values.difficulty as ExerciseWriteDTO['difficulty']) || undefined,
            equipment: (values.equipment as ExerciseWriteDTO['equipment']) || undefined,
            force: (values.force as ExerciseWriteDTO['force']) || undefined,
            mechanics: (values.mechanics as ExerciseWriteDTO['mechanics']) || undefined,
            role: (values.role as ExerciseWriteDTO['role']) || undefined,
            type: (values.type as ExerciseWriteDTO['type']) || undefined,
            group_name: (values.group_name as string) || undefined,
            exercise_muscles,
        };

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
            customCss={styles.editButton}
            customIconCss={styles.editBButtonIcon}
        />
    );

    return (
        <DrawerModal open={open} onClose={handleClose} headerButton={editButton}>
            <div css={styles.container}>
                <div css={styles.header}>
                    <span css={styles.name}>{exercise.name}</span>
                </div>

                <Divider />

                <FormBuilder
                    items={buildFormItems(exercise, muscleOptions)}
                    columns={2}
                    disabled={!editMode}
                    onSubmit={handleSubmit}
                />
            </div>
        </DrawerModal>
    );
};

export default ExerciseDrawer;
