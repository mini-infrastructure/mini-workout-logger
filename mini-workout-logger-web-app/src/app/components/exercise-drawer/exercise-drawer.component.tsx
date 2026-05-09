import {useMemo, useState} from 'react';
import {MdEdit, MdEditOff} from 'react-icons/md';
import DrawerModal from '../drawer-modal/drawer-modal.component.tsx';
import type {FormFieldValue, FormItem} from '../input/form/form.input.component.tsx';
import FormBuilder from '../input/form/form.input.component.tsx';
import Divider from '../divider/divider.component.tsx';
import Button from '../button/button.component.tsx';
import MultiSelect from '../input/form/multiselect.form.input.component.tsx';
import type {ColoredMuscle} from '../human-body/human-body.component.tsx';
import HumanBody from '../human-body/human-body.component.tsx';
import type {ExerciseReadDTO} from '../../dtos/exercise-read.dto.tsx';
import type {ExerciseWriteDTO} from '../../dtos/exercise-write.dto.tsx';
import type {ExerciseMuscleWriteDTO} from '../../dtos/exercise-muscle-write.dto.tsx';
import type {ExerciseMuscleMovementClassification} from '../../models/muscle.model.tsx';
import ExerciseService from '../../services/exercise.service.tsx';
import {useMuscles} from '../../hooks/useMuscles.tsx';
import {useAlert} from '../../context/alert.context.tsx';
import {
    exerciseCategoryOptions,
    exerciseDifficultyOptions,
    exerciseEquipmentOptions,
    exerciseForceOptions,
    exerciseMechanicsOptions,
    exerciseRoleOptions,
    exerciseTypeOptions,
} from '../../models/exercise.model.tsx';
import type {LegendItem} from '../legends/legends.component.tsx';
import Legends from '../legends/legends.component.tsx';
import Image from '../image/image.component.tsx';
import styles from './exercise-drawer.component.style.tsx';

const classificationColors: Record<ExerciseMuscleMovementClassification, string> = {
    TARGET:                 'var(--color-red)',
    AGONIST:                'var(--color-orange)',
    SYNERGIST:              'var(--color-yellow)',
    DYNAMIC_STABILIZER:     'var(--color-green)',
    STABILIZER:             'var(--color-blue)',
    ANTAGONIST_STABILIZER:  'var(--color-purple)',
    ANTAGONIST:             'var(--color-pink)',
};

const classificationLabels: Record<ExerciseMuscleMovementClassification, string> = {
    TARGET:                 'Target',
    AGONIST:                'Agonist',
    SYNERGIST:              'Synergist',
    STABILIZER:             'Stabilizer',
    DYNAMIC_STABILIZER:     'Dynamic Stabilizer',
    ANTAGONIST:             'Antagonist',
    ANTAGONIST_STABILIZER:  'Antagonist Stabilizer',
};

export type ExerciseDrawerProps = {
    exercise: ExerciseReadDTO;
    open: boolean;
    onClose: () => void;
};

const buildFormItems = (exercise: ExerciseReadDTO): FormItem[] => [
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
];

const ExerciseDrawer = ({ exercise, open, onClose }: ExerciseDrawerProps) => {
    const [editMode, setEditMode] = useState(false);
    const pushAlert = useAlert();
    const coverMedia = exercise.cover_media;
    const initialCoverSrc = coverMedia ? `data:${coverMedia.content_type};base64,${coverMedia.data}` : undefined;
    const [coverSrc, setCoverSrc] = useState(initialCoverSrc);

    const handleCoverUpload = async (file: File) => {
        const preview = URL.createObjectURL(file);
        setCoverSrc(preview);
        try {
            await ExerciseService.uploadMedia(exercise.id, file, 'COVER');
            pushAlert('Cover image updated.', 'success');
        } catch {
            setCoverSrc(initialCoverSrc);
            pushAlert('Failed to upload cover image.', 'error');
        }
    };
    const [selectedMuscleNames, setSelectedMuscleNames] = useState<string[]>(
        exercise.exercise_muscles?.map((m) => m.muscle_name) ?? []
    );
    const [focusedClassifications, setFocusedClassifications] = useState<Set<ExerciseMuscleMovementClassification>>(new Set());
    const { muscles } = useMuscles();

    const muscleOptions = muscles.map((m) => ({ label: m.name, value: m.name }));

    // Build coloredMuscles: show all when nothing is focused, or only the focused classifications.
    const coloredMuscles = useMemo<ColoredMuscle[]>(() => {
        if (!exercise.exercise_muscles) return [];
        return exercise.exercise_muscles.flatMap((em) => {
            const code = em.muscle_code;
            if (!code) return [];
            if (focusedClassifications.size > 0 && !focusedClassifications.has(em.role)) return [];
            return [{ code, color: classificationColors[em.role] }];
        });
    }, [exercise.exercise_muscles, focusedClassifications]);

    // Classifications present in this exercise, for the legend.
    const activeClassifications = useMemo(() => {
        if (!exercise.exercise_muscles) return [];
        const seen = new Set<ExerciseMuscleMovementClassification>();
        exercise.exercise_muscles.forEach((em) => seen.add(em.role));
        return (Object.keys(classificationColors) as ExerciseMuscleMovementClassification[])
            .filter((c) => seen.has(c));
    }, [exercise.exercise_muscles]);

    const legendItems = useMemo<LegendItem[]>(() =>
        activeClassifications.map((c) => ({
            key: c,
            label: classificationLabels[c],
            color: classificationColors[c],
            onClick: (_key, selectedKeys) =>
                setFocusedClassifications(new Set(selectedKeys as ExerciseMuscleMovementClassification[])),
        })),
    [activeClassifications]);

    const handleClose = () => {
        setEditMode(false);
        onClose();
    };

    const handleSubmit = async (values: Record<string, FormFieldValue>) => {
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
            noBorder
            customCss={styles.editButton}
            customIconCss={styles.editBButtonIcon}
        />
    );

    return (
        <DrawerModal open={open} onClose={handleClose} headerButton={editButton}>
            <div css={styles.container}>
                {/*<div css={styles.header}>*/}
                {/*    <span css={styles.name}>{exercise.name}</span>*/}
                {/*</div>*/}

                {/* Cover media */}
                <Image
                    src={coverSrc}
                    alt={coverMedia?.filename}
                    size={80}
                    onUpload={handleCoverUpload}
                    customCss={styles.mediaArea}
                />

                <Divider />

                <FormBuilder
                    items={buildFormItems(exercise)}
                    columns={2}
                    disabled={!editMode}
                    onSubmit={handleSubmit}
                />

                <Divider />

                {/* Muscles row: multiselect on left, front + back body maps on right */}
                <div css={styles.musclesRow}>
                    <div css={styles.musclesLeft}>
                        <span css={styles.fieldLabel}>Muscles</span>
                        <MultiSelect
                            options={muscleOptions}
                            value={selectedMuscleNames}
                            onChange={setSelectedMuscleNames}
                            disabled={!editMode}
                            editMode={editMode}
                        />
                    </div>

                    <div css={styles.bodyMapsColumn}>
                        <div css={styles.bodyMaps}>
                            <div css={styles.bodyMapItem}>
                                <HumanBody
                                    coloredMuscles={coloredMuscles}
                                    initialView="front"
                                    showFlipButton={false}
                                />
                            </div>
                            <div css={styles.bodyMapItem}>
                                <HumanBody
                                    coloredMuscles={coloredMuscles}
                                    initialView="back"
                                    showFlipButton={false}
                                />
                            </div>
                        </div>

                        {legendItems.length > 0 && (
                            <Legends items={legendItems} customCss={styles.legend} />
                        )}
                    </div>
                </div>

            </div>
        </DrawerModal>
    );
};

export default ExerciseDrawer;
