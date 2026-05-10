import {useCallback, useMemo, useRef, useState} from 'react';
import Modal from '../../components/modal/modal.component.tsx';
import PrimaryButton from '../../components/button/button.primary.component.tsx';
import SecondaryButton from '../../components/button/button.secondary.component.tsx';
import FormBuilder from '../../components/input/form/form.input.component.tsx';
import type {FormFieldValue, FormItem, FormOption} from '../../components/input/form/form.input.component.tsx';
import exerciseService from '../../services/exercise.service.tsx';
import activityLogService from '../../services/activity-log.service.tsx';
import type {ExerciseReadDTO} from '../../dtos/exercise-read.dto.tsx';
import {useAlert} from '../../context/alert.context.tsx';
import styles from './add-log.modal.component.style.tsx';

const ACTIVITY_CATEGORY_FILTER = 'CARDIO,STRETCHING,MOBILITY,RECOVERY,WARM_UP';

const toLocalDatetimeValue = (date: Date): string => {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};


type Props = {
    open: boolean;
    onClose: () => void;
    onCreated: () => void;
};

const AddLogModal = ({ open, onClose, onCreated }: Props) => {
    const pushAlert = useAlert();
    const [submitting, setSubmitting] = useState(false);
    const [resetKey, setResetKey] = useState(0);

    const [nameSuggestions, setNameSuggestions] = useState<FormOption[]>([]);
    // selectedExerciseRef holds the exercise picked via suggestion; cleared on search
    const selectedExerciseRef = useRef<ExerciseReadDTO | null>(null);
    const resultsRef = useRef<ExerciseReadDTO[]>([]);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleNameSearch = useCallback((value: string) => {
        selectedExerciseRef.current = null;
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (!value.trim()) { setNameSuggestions([]); return; }
        debounceRef.current = setTimeout(async () => {
            const result = await exerciseService.getAll({
                name: value,
                category: ACTIVITY_CATEGORY_FILTER,
                size: 50,
            });
            const exercises = result.data ?? [];
            resultsRef.current = exercises;
            setNameSuggestions(exercises.map((e) => ({ label: e.name, value: e.name })));
        }, 250);
    }, []);

    const handleSuggestionSelect = useCallback((value: string) => {
        const found = resultsRef.current.find((e) => e.name === value);
        if (found) selectedExerciseRef.current = found;
    }, []);

    const formItems = useMemo<FormItem[]>(() => [
        {
            name: 'exercise_name',
            label: 'Exercise',
            type: 'text',
            colSpan: 2,
            required: true,
            placeholder: 'Search cardio / mind-body exercise...',
            onSearch: handleNameSearch,
            onSuggestionSelect: handleSuggestionSelect,
        },
        {
            name: 'start_time',
            label: 'Date & Time',
            type: 'datetime',
            colSpan: 1,
            initialValue: toLocalDatetimeValue(new Date()),
        },
        {
            name: 'duration_minutes',
            label: 'Duration (min)',
            type: 'number',
            colSpan: 1,
            placeholder: 'e.g. 30',
        },
    ], [handleNameSearch, handleSuggestionSelect]);

    const handleSubmit = async (values: Record<string, FormFieldValue>) => {
        const typedName = (values.exercise_name as string ?? '').trim();
        const exercise =
            selectedExerciseRef.current ??
            resultsRef.current.find((e) => e.name === typedName) ??
            null;

        if (!exercise) {
            pushAlert('Please select an exercise from the suggestions.', 'error');
            return;
        }

        setSubmitting(true);
        try {
            const startTime = values.start_time as string | undefined;
            const mins = values.duration_minutes ? parseFloat(values.duration_minutes as string) : undefined;
            await activityLogService.create({
                exercise_id:      exercise.id,
                start_time:       startTime ? new Date(startTime).toISOString() : undefined,
                duration_seconds: mins !== undefined && !isNaN(mins) ? Math.round(mins * 60) : undefined,
                completed:        true,
            });
            onCreated();
            handleClose();
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = () => {
        selectedExerciseRef.current = null;
        setNameSuggestions([]);
        resultsRef.current = [];
        setResetKey((k) => k + 1);
        onClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <div css={styles.body}>
                <FormBuilder
                    id="add-log-form"
                    items={formItems}
                    columns={2}
                    onSubmit={handleSubmit}
                    submitButton={<></>}
                    resetKey={resetKey}
                    suggestions={{ exercise_name: nameSuggestions }}
                />

                <div css={styles.footer}>
                    <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
                    <PrimaryButton
                        type="submit"
                        form="add-log-form"
                        disabled={submitting}
                    >
                        Save
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
};

export default AddLogModal;
