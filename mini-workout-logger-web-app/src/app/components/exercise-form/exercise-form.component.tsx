import {useCallback, useMemo, useState} from 'react';
import PrimaryButton from '../button/button.primary.component.tsx';
import Image from '../image/image.component.tsx';
import Divider from '../divider/divider.component.tsx';
import type {FormFieldValue, FormItem, FormOption} from '../input/form/form.input.component.tsx';
import FormBuilder from '../input/form/form.input.component.tsx';
import MultiSelect from '../input/form/multiselect.form.input.component.tsx';
import type {ColoredMuscle} from '../human-body/human-body.component.tsx';
import HumanBody from '../human-body/human-body.component.tsx';
import type {ExerciseReadDTO} from '../../dtos/exercise-read.dto.tsx';
import type {ExerciseWriteDTO} from '../../dtos/exercise-write.dto.tsx';
import type {ExerciseMuscleMovementClassification} from '../../models/muscle.model.tsx';
import {useMuscles} from '../../hooks/useMuscles.tsx';
import {useExerciseGroupNames} from '../../hooks/useExerciseGroupNames.tsx';
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
import Ball from '../ball/ball.component.tsx';
import styles from './exercise-form.component.style.tsx';
import {css} from '@emotion/react';

export const classificationColors: Record<ExerciseMuscleMovementClassification, string> = {
    TARGET:                 'var(--color-red)',
    AGONIST:                'var(--color-orange)',
    SYNERGIST:              'var(--color-yellow)',
    DYNAMIC_STABILIZER:     'var(--color-green)',
    STABILIZER:             'var(--color-blue)',
    ANTAGONIST_STABILIZER:  'var(--color-purple)',
    ANTAGONIST:             'var(--color-pink)',
};

export const classificationLabels: Record<ExerciseMuscleMovementClassification, string> = {
    TARGET:                 'Target',
    AGONIST:                'Agonist',
    SYNERGIST:              'Synergist',
    STABILIZER:             'Stabilizer',
    DYNAMIC_STABILIZER:     'Dynamic Stabilizer',
    ANTAGONIST:             'Antagonist',
    ANTAGONIST_STABILIZER:  'Antagonist Stabilizer',
};

const ALL_CLASSIFICATIONS = Object.keys(classificationColors) as ExerciseMuscleMovementClassification[];

type MuscleSelection = Record<ExerciseMuscleMovementClassification, string[]>;

const buildInitialSelection = (exercise?: ExerciseReadDTO): MuscleSelection => {
    const selection = Object.fromEntries(
        ALL_CLASSIFICATIONS.map((c) => [c, [] as string[]])
    ) as MuscleSelection;

    exercise?.exercise_muscles?.forEach((em) => {
        if (selection[em.role]) {
            selection[em.role].push(em.muscle_name);
        }
    });

    return selection;
};

export type ExerciseFormProps = {
    exercise?: ExerciseReadDTO;
    disabled?: boolean;
    onSubmit: (payload: ExerciseWriteDTO, coverFile?: File) => Promise<void>;
    onCoverUpload?: (file: File) => Promise<void>;
};

const ExerciseForm = ({ exercise, disabled = false, onSubmit, onCoverUpload }: ExerciseFormProps) => {
    const { muscles } = useMuscles();
    const { exerciseGroupNames } = useExerciseGroupNames();

    const groupOptions = useMemo(
        () => exerciseGroupNames.map((name) => ({ label: name, value: name })),
        [exerciseGroupNames]
    );

    const coverMedia = exercise?.cover_media;
    const initialCoverSrc = coverMedia ? `data:${coverMedia.content_type};base64,${coverMedia.data}` : undefined;
    const [coverSrc, setCoverSrc] = useState(initialCoverSrc);
    const [pendingCoverFile, setPendingCoverFile] = useState<File | undefined>(undefined);
    const [canSubmit, setCanSubmit] = useState(true);

    const handleCoverUpload = useCallback(async (file: File) => {
        setCoverSrc(URL.createObjectURL(file));
        if (onCoverUpload) {
            try {
                await onCoverUpload(file);
            } catch {
                setCoverSrc(initialCoverSrc);
            }
        } else {
            setPendingCoverFile(file);
        }
    }, [onCoverUpload, initialCoverSrc]);

    const [muscleSelection, setMuscleSelection] = useState<MuscleSelection>(
        () => buildInitialSelection(exercise)
    );
    const [focusedClassifications, setFocusedClassifications] = useState<Set<ExerciseMuscleMovementClassification>>(new Set());

    const muscleOptions = muscles.map((m) => ({ label: m.name, value: m.name }));

    const setClassificationMuscles = (classification: ExerciseMuscleMovementClassification, names: string[]) => {
        setMuscleSelection((prev) => ({ ...prev, [classification]: names }));
    };

    const handleValidationChange = useCallback((valid: boolean) => setCanSubmit(valid), []);

    const coloredMuscles = useMemo<ColoredMuscle[]>(() => {
        return ALL_CLASSIFICATIONS.flatMap((classification) => {
            if (focusedClassifications.size > 0 && !focusedClassifications.has(classification)) return [];
            return muscleSelection[classification].flatMap((name) => {
                const muscle = muscles.find((m) => m.name === name);
                return muscle?.code ? [{ code: muscle.code, color: classificationColors[classification] }] : [];
            });
        });
    }, [muscleSelection, focusedClassifications, muscles]);

    const legendItems = useMemo<LegendItem[]>(() =>
        ALL_CLASSIFICATIONS
            .filter((c) => muscleSelection[c].length > 0)
            .map((c) => ({
                key: c,
                label: classificationLabels[c],
                color: classificationColors[c],
                onClick: (_key, selectedKeys) =>
                    setFocusedClassifications(new Set(selectedKeys as ExerciseMuscleMovementClassification[])),
            })),
    [muscleSelection]);

    const hasAnyMuscle = ALL_CLASSIFICATIONS.some((c) => muscleSelection[c].length > 0);

    // Build form items with image as a custom slot between name and the expert fields.
    // coverSrc / handleCoverUpload are captured via the render ReactNode; formItems
    // itself only rebuilds when exercise or groupOptions change.
    const formItems = useMemo<FormItem[]>(() => [
        { name: 'name',      label: 'Name',       type: 'text',         colSpan: 2, initialValue: exercise?.name       ?? '', required: true },
        { name: '_image',    label: '',            type: 'custom',       colSpan: 2,
          render: (
              <Image
                  src={coverSrc}
                  alt={coverMedia?.filename}
                  size={80}
                  onUpload={disabled ? undefined : handleCoverUpload}
                  customCss={styles.mediaArea}
              />
          ),
        },
        { name: 'category',  label: 'Category',   type: 'select',       options: exerciseCategoryOptions,   initialValue: exercise?.category   ?? '' },
        { name: 'difficulty',label: 'Difficulty',  type: 'select',       options: exerciseDifficultyOptions, initialValue: exercise?.difficulty ?? '' },
        { name: 'equipment', label: 'Equipment',   type: 'select',       options: exerciseEquipmentOptions,  initialValue: exercise?.equipment  ?? '', required: true },
        { name: 'force',     label: 'Force',       type: 'select',       options: exerciseForceOptions,      initialValue: exercise?.force      ?? '' },
        { name: 'mechanics', label: 'Mechanics',   type: 'select',       options: exerciseMechanicsOptions,  initialValue: exercise?.mechanics  ?? '' },
        { name: 'type',      label: 'Type',        type: 'select',       options: exerciseTypeOptions,       initialValue: exercise?.type       ?? '' },
        { name: 'role',      label: 'Role',        type: 'select',       options: exerciseRoleOptions,       initialValue: exercise?.role       ?? '' },
        { name: 'group_name',label: 'Group',       type: 'buttonselect', options: groupOptions,              initialValue: exercise?.group_name ?? '', required: true, inputEnabled: true },
    ], [exercise, groupOptions, coverSrc, disabled, handleCoverUpload, coverMedia?.filename]);

    const handleSubmit = async (values: Record<string, FormFieldValue>) => {
        const exercise_muscles = ALL_CLASSIFICATIONS.flatMap((classification) =>
            muscleSelection[classification].flatMap((name) => {
                const muscle = muscles.find((m) => m.name === name);
                return muscle ? [{ muscle_id: muscle.id, role: classification }] : [];
            })
        );

        const payload: ExerciseWriteDTO = {
            name:       values.name as string,
            category:   (values.category   as ExerciseWriteDTO['category'])   || undefined,
            difficulty: (values.difficulty  as ExerciseWriteDTO['difficulty']) || undefined,
            equipment:  (values.equipment   as ExerciseWriteDTO['equipment'])  || undefined,
            force:      (values.force       as ExerciseWriteDTO['force'])      || undefined,
            mechanics:  (values.mechanics   as ExerciseWriteDTO['mechanics'])  || undefined,
            role:       (values.role        as ExerciseWriteDTO['role'])       || undefined,
            type:       (values.type        as ExerciseWriteDTO['type'])       || undefined,
            group_name: (values.group_name  as string) || undefined,
            exercise_muscles,
        };

        await onSubmit(payload, pendingCoverFile);
    };

    const visibleClassifications = ALL_CLASSIFICATIONS.filter(
        (c) => !disabled || muscleSelection[c].length > 0
    );

    return (
        <div css={styles.container}>
            <FormBuilder
                id="exercise-form-fields"
                items={formItems}
                columns={2}
                disabled={disabled}
                onSubmit={handleSubmit}
                submitButton={<></>}
                onValidationChange={handleValidationChange}
            />

            <Divider />

            <div css={styles.musclesRow}>
                <div css={styles.musclesLeft}>
                    <span css={styles.musclesHeader}>Muscles</span>

                    {disabled && !hasAnyMuscle ? (
                        <div css={styles.classificationSection}>
                            <input
                                css={css({
                                    padding: '0.2rem 0.8rem',
                                    minHeight: 'var(--input-height)',
                                    borderRadius: 'var(--borderRadius-small)',
                                    backgroundColor: 'var(--color-container2)',
                                    border: 'none',
                                    fontSize: 'var(--size-input-text)',
                                    color: 'var(--color-gray)',
                                    width: '100%',
                                })}
                                type="text"
                                value="No muscles"
                                disabled
                                readOnly
                            />
                        </div>
                    ) : (
                        visibleClassifications.map((classification) => (
                            <div key={classification} css={styles.classificationSection}>
                                <div css={styles.classificationHeader}>
                                    <Ball color={classificationColors[classification]} on={true} />
                                    <span css={styles.classificationLabel}>
                                        {classificationLabels[classification]}
                                    </span>
                                </div>
                                <MultiSelect
                                    options={muscleOptions}
                                    value={muscleSelection[classification]}
                                    onChange={(names) => setClassificationMuscles(classification, names)}
                                    disabled={disabled}
                                    editMode={!disabled}
                                />
                            </div>
                        ))
                    )}
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

            {!disabled && (
                <>
                    <Divider />
                    <PrimaryButton type="submit" form="exercise-form-fields" disabled={!canSubmit}>
                        Submit
                    </PrimaryButton>
                </>
            )}
        </div>
    );
};

export default ExerciseForm;
