import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import type { MediaReadDTO } from '../../dtos/MediaReadDTO/index.ts';
import { MdEdit, MdEditOff, MdAdd, MdClose } from 'react-icons/md';
import { FaImages } from 'react-icons/fa';
import Carousel from '../Carousel/index.tsx';
import DrawerModal from '../DrawerModal/index.tsx';
import FormBuilder from '../FormBuilder/index.tsx';
import type { FormItem, FormFieldValue } from '../FormBuilder/index.tsx';
import Divider from '../Divider/index.tsx';
import Button from '../Button/index.tsx';
import MultiSelect from '../MultiSelect/index.tsx';
import HumanBody from '../HumanBody/index.tsx';
import type { ColoredMuscle } from '../HumanBody/index.tsx';
import type { ExerciseReadDTO } from '../../dtos/ExerciseReadDTO/index.ts';
import type { ExerciseWriteDTO } from '../../dtos/ExerciseWriteDTO/index.ts';
import type { ExerciseMuscleWriteDTO } from '../../dtos/ExerciseMuscleWriteDTO/index.ts';
import type { ExerciseMuscleMovementClassification } from '../../models/Muscle/index.tsx';
import ExerciseService from '../../services/ExerciseService/index.ts';
import { useMuscles } from '../../hooks/useMuscles/index.tsx';
import { useAlert } from '../../context/alert.context.tsx';
import {
    exerciseCategoryOptions,
    exerciseDifficultyOptions,
    exerciseEquipmentOptions,
    exerciseForceOptions,
    exerciseMechanicsOptions,
    exerciseRoleOptions,
    exerciseTypeOptions,
} from '../../models/Exercise/index.tsx';
import Legends from '../Legends/index.tsx';
import type { LegendItem } from '../Legends/index.tsx';
import styles from './index.style.tsx';

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
    const [media, setMedia] = useState<MediaReadDTO[]>(exercise.media ?? []);

    useEffect(() => {
        setMedia(exercise.media ?? []);
    }, [exercise.id]);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null!);
    const pushAlert = useAlert();
    const [selectedMuscleNames, setSelectedMuscleNames] = useState<string[]>(
        exercise.exercise_muscles?.map((m) => m.muscle_name) ?? []
    );
    const [focusedClassifications, setFocusedClassifications] = useState<Set<ExerciseMuscleMovementClassification>>(new Set());
    const { muscles } = useMuscles();

    const muscleOptions = muscles.map((m) => ({ label: m.name, value: m.name }));

    const handleMediaUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const uploaded = await ExerciseService.uploadMedia(exercise.id, file);
            setMedia((prev) => [...prev, uploaded]);
        } catch {
            pushAlert('Failed to upload media.', 'error');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleMediaRemove = async (mediaId: number) => {
        try {
            await ExerciseService.deleteMedia(exercise.id, mediaId);
            setMedia((prev) => prev.filter((m) => m.id !== mediaId));
        } catch {
            pushAlert('Failed to remove media.', 'error');
        }
    };

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
                <div css={styles.header}>
                    <span css={styles.name}>{exercise.name}</span>
                </div>

                {/* Media carousel */}
                <div css={styles.mediaArea}>
                    {media.length > 0 ? (
                        <Carousel customCss={styles.carousel}>
                            {media.map((m) => (
                                <div key={m.id} css={styles.mediaSlide}>
                                    <img
                                        css={styles.mediaImg}
                                        src={`data:${m.content_type};base64,${m.data}`}
                                        alt={m.filename}
                                    />
                                    {editMode && (
                                        <Button
                                            icon={<MdClose />}
                                            onClick={() => handleMediaRemove(m.id)}
                                            title="Remove"
                                            noBorder
                                            customCss={styles.mediaRemoveBtn}
                                            customIconCss={styles.mediaRemoveBtnIcon}
                                        />
                                    )}
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        <div css={styles.mediaPlaceholder}>
                            <FaImages />
                        </div>
                    )}

                    {editMode && (
                        <Button
                            icon={<MdAdd />}
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            title="Add image"
                            noBorder
                            customCss={styles.mediaAddBtn}
                        />
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleMediaUpload}
                    />
                </div>

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
