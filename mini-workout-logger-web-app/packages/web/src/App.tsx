import { useState, useRef, useEffect, useMemo } from 'react';
import { css } from '@emotion/react';
import { FiMenu, FiX, FiPlus, FiHeart, FiCheck, FiChevronDown } from 'react-icons/fi';
import {
    useWorkouts,
    ExerciseService,
    exerciseCategoryOptions,
    exerciseDifficultyOptions,
    exerciseEquipmentOptions,
    exerciseForceOptions,
    exerciseMechanicsOptions,
    exerciseRoleOptions,
    exerciseTypeOptions,
    energySystemOptions,
} from '@mini/shared';
import AutocompleteInput from './app/components/AutocompleteInput';
import type { DropdownOption } from './app/components/Dropdown';

import PrimaryButton from './app/components/PrimaryButton';
import SecondaryButton from './app/components/SecondaryButton';
import IconButton from './app/components/IconButton';
import Card from './app/components/Card';
import StatCard from './app/components/StatCard';
import FolderCard from './app/components/FolderCard';
import ProgressBar from './app/components/ProgressBar';
import ProgressCard from './app/components/ProgressCard';
import ActionCard from './app/components/ActionCard';
import Form, { type FormValues, type FormField, parseBackendErrors } from './app/components/Form';
import { useAlert } from './app/context/alert.context';

const styles = {
    container: css({
        minHeight: '100vh',
        padding: 'var(--space-xl)',
    }),
    title: css({
        fontSize: 'var(--font-size-2xl)',
        fontWeight: 'var(--font-weight-bold)',
        marginBottom: 'var(--space-xl)',
    }),
    section: css({
        marginBottom: 'var(--space-2xl)',
    }),
    sectionTitle: css({
        fontSize: 'var(--font-size-lg)',
        fontWeight: 'var(--font-weight-semibold)',
        marginBottom: 'var(--space-md)',
        color: 'var(--color-white)',
    }),
    row: css({
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--space-md)',
    }),
    cardRow: css({
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 'var(--space-lg)',
    }),
    progressContainer: css({
        width: '20rem',
    }),
    progressInteractive: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-md)',
        width: '20rem',
    }),
    progressBarWrapper: css({
        flex: 1,
    }),
    formContainer: css({
        width: '100%',
        maxWidth: '50rem',
    }),
    searchContainer: css({
        width: '100%',
        maxWidth: '25rem',
    }),
    formActions: css({
        display: 'flex',
        gap: 'var(--space-md)',
        marginTop: 'var(--space-lg)',
    }),
    cardsRow: css({
        display: 'flex',
        gap: 'var(--space-xl)',
        alignItems: 'flex-start',
    }),
    cardColumn: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-sm)',
    }),
    cardColumnTitle: css({
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-medium)',
        color: 'var(--color-white)',
    }),
};

// Base exercise form fields (group_name options injected dynamically)
const baseExerciseFormFields: Omit<FormField, 'options'>[] = [
    { name: 'name', label: 'Name', type: 'text', slots: 6, required: true },
    { name: 'group_name', label: 'Group', type: 'select', slots: 6, required: true, editable: true },
    { name: 'category', label: 'Category', type: 'select', slots: 4 },
    { name: 'difficulty', label: 'Difficulty', type: 'select', slots: 4 },
    { name: 'equipment', label: 'Equipment', type: 'select', slots: 4, required: true },
    { name: 'force', label: 'Force', type: 'select', slots: 4 },
    { name: 'mechanics', label: 'Mechanics', type: 'select', slots: 4 },
    { name: 'type', label: 'Type', type: 'select', slots: 4 },
    { name: 'role', label: 'Role', type: 'select', slots: 6 },
    { name: 'energy_system', label: 'Energy System', type: 'select', slots: 6 },
];

function App() {
    const [primarySelected, setPrimarySelected] = useState(false);
    const [secondarySelected, setSecondarySelected] = useState(false);
    const [iconSelected, setIconSelected] = useState(false);
    const [interactiveProgress, setInteractiveProgress] = useState(20);
    const pushAlert = useAlert();

    // Fetch workouts data
    const { workouts } = useWorkouts();
    const workoutCount = workouts.length;
    const firstWorkout = workouts[0];
    const firstWorkoutExerciseCount = firstWorkout?.workout_exercises?.length ?? 0;

    // Form state
    const formContainerRef = useRef<HTMLDivElement>(null);
    const [formValues, setFormValues] = useState<FormValues>({});
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);

    // Group names for editable select
    const [allGroupNames, setAllGroupNames] = useState<string[]>([]);

    // Fetch group names on mount
    useEffect(() => {
        ExerciseService.getAllExerciseGroupNames().then(setAllGroupNames);
    }, []);

    // Convert group names to options
    const groupOptions = useMemo(() =>
        allGroupNames.map(name => ({ value: name, label: name })),
    [allGroupNames]);

    // Map of field name to options
    const fieldOptionsMap: Record<string, DropdownOption[]> = useMemo(() => ({
        group_name: groupOptions,
        category: exerciseCategoryOptions,
        difficulty: exerciseDifficultyOptions,
        equipment: exerciseEquipmentOptions,
        force: exerciseForceOptions,
        mechanics: exerciseMechanicsOptions,
        type: exerciseTypeOptions,
        role: exerciseRoleOptions,
        energy_system: energySystemOptions,
    }), [groupOptions]);

    // Build form fields with dynamic options
    const exerciseFormFields = useMemo((): FormField[] => {
        return baseExerciseFormFields.map(field => {
            const options = fieldOptionsMap[field.name];
            if (options) {
                return { ...field, options } as FormField;
            }
            return field as FormField;
        });
    }, [fieldOptionsMap]);

    // Exercise search state (separate from form)
    const [exerciseSearchValue, setExerciseSearchValue] = useState('');
    const [selectedExerciseLabel, setSelectedExerciseLabel] = useState<string | null>(null);
    const [exerciseSuggestions, setExerciseSuggestions] = useState<DropdownOption[]>([]);
    const [isSearchingExercises, setIsSearchingExercises] = useState(false);

    const handleFormChange = (name: string, value: string | string[] | null) => {
        setFormValues(prev => ({ ...prev, [name]: value }));
        // Clear error when field changes
        if (formErrors[name]) {
            setFormErrors(prev => {
                const updated = { ...prev };
                delete updated[name];
                return updated;
            });
        }
    };

    // Exercise search handler - queries the backend
    const handleExerciseSearch = async (searchValue: string) => {
        setExerciseSearchValue(searchValue);
        // Clear selected label if user is typing something different
        if (selectedExerciseLabel && searchValue !== selectedExerciseLabel) {
            setSelectedExerciseLabel(null);
        }
        if (searchValue.length < 2) {
            setExerciseSuggestions([]);
            return;
        }
        setIsSearchingExercises(true);
        try {
            const response = await ExerciseService.getAll({ name: searchValue, size: 10 });
            const options: DropdownOption[] = response.data.map(exercise => ({
                value: String(exercise.id),
                label: exercise.name,
            }));
            setExerciseSuggestions(options);
        } catch {
            setExerciseSuggestions([]);
        } finally {
            setIsSearchingExercises(false);
        }
    };

    const handleExerciseSelect = (option: DropdownOption) => {
        setExerciseSearchValue(option.label);
        setSelectedExerciseLabel(option.label);
        setExerciseSuggestions([]);
        pushAlert(`Selected exercise: ${option.label}`, 'info');
    };

    const handleExerciseSearchFocus = () => {
        // Only search on focus if the current value is NOT the selected exercise
        if (exerciseSearchValue.length >= 2 && exerciseSearchValue !== selectedExerciseLabel) {
            handleExerciseSearch(exerciseSearchValue);
        }
    };

    const handleFormSubmit = async () => {
        try {
            const payload = {
                name: formValues.name as string,
                group_name: formValues.group_name as string,
                equipment: formValues.equipment as string,
                category: formValues.category as string || undefined,
                difficulty: formValues.difficulty as string || undefined,
                force: formValues.force as string || undefined,
                mechanics: formValues.mechanics as string || undefined,
                type: formValues.type as string || undefined,
                role: formValues.role as string || undefined,
                energy_system: formValues.energy_system as string || undefined,
                exercise_muscles: [],
            };
            await ExerciseService.create(payload);
            pushAlert('Exercise created successfully!', 'success');
            setFormValues({});
            setFormErrors({});
        } catch (error) {
            if (error instanceof Error && error.message) {
                // Backend returns errors in format "field -> message"
                const errorLines = error.message.split('\n').filter(Boolean);
                const parsedErrors = parseBackendErrors(errorLines);
                if (Object.keys(parsedErrors).length > 0) {
                    setFormErrors(parsedErrors);
                    pushAlert('Validation errors from backend', 'error');
                } else {
                    pushAlert(error.message, 'error');
                }
            } else {
                pushAlert('An error occurred while creating exercise', 'error');
            }
        }
    };

    const handleFormClear = () => {
        setFormValues({});
        setFormErrors({});
        pushAlert('Form cleared', 'success');
    };

    const handleIncreaseProgress = () => {
        setInteractiveProgress(prev => Math.min(prev + 10, 100));
    };

    return (
        <div css={styles.container}>
            <h1 css={styles.title}>Component Showcase</h1>

            {/* Primary Button */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>PrimaryButton</h2>
                <div css={styles.row}>
                    <PrimaryButton label="Default" />
                    <PrimaryButton label="With icon" icon={<FiPlus />} />
                    <PrimaryButton label="Icon right" icon={<FiHeart />} iconPosition="right" />
                    <PrimaryButton label="Disabled" disabled />
                    <PrimaryButton
                        label={primarySelected ? 'Selected' : 'Toggle me'}
                        icon={<FiPlus />}
                        selectedIcon={<FiCheck />}
                        isSelected={primarySelected}
                        animateIcon
                        onClick={() => setPrimarySelected(!primarySelected)}
                    />
                </div>
            </section>

            {/* Secondary Button */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>SecondaryButton</h2>
                <div css={styles.row}>
                    <SecondaryButton label="Default" />
                    <SecondaryButton label="With icon" icon={<FiPlus />} />
                    <SecondaryButton label="Icon right" icon={<FiHeart />} iconPosition="right" />
                    <SecondaryButton label="Dropdown" icon={<FiChevronDown />} iconPosition="right" />
                    <SecondaryButton label="Disabled" disabled />
                    <SecondaryButton
                        label={secondarySelected ? 'Selected' : 'Toggle me'}
                        icon={<FiPlus />}
                        selectedIcon={<FiCheck />}
                        isSelected={secondarySelected}
                        animateIcon
                        onClick={() => setSecondarySelected(!secondarySelected)}
                    />
                </div>
            </section>

            {/* Icon Button */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>IconButton</h2>
                <div css={styles.row}>
                    <IconButton icon={<FiMenu />} tooltip="Menu" />
                    <IconButton icon={<FiPlus />} tooltip="Add" />
                    <IconButton icon={<FiHeart />} tooltip="Favorite" />
                    <IconButton icon={<FiPlus />} disabled tooltip="Disabled" />
                    <IconButton
                        icon={<FiMenu />}
                        selectedIcon={<FiX />}
                        isSelected={iconSelected}
                        animateIcon
                        tooltip="Toggle menu"
                        onClick={() => setIconSelected(!iconSelected)}
                    />
                </div>
            </section>

            {/* Progress Bar */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>ProgressBar</h2>
                <div css={styles.cardRow}>
                    <div css={styles.progressContainer}>
                        <ProgressBar label="$12 saved" current={12} total={50} color="red" />
                    </div>
                    <div css={styles.progressContainer}>
                        <ProgressBar label="Progress" current={75} total={100} color="green" />
                    </div>
                    <div css={styles.progressContainer}>
                        <ProgressBar label="Tasks done" current={3} total={10} color="blue" showPercentage={false} />
                    </div>
                    <div css={styles.progressInteractive}>
                        <div css={styles.progressBarWrapper}>
                            <ProgressBar
                                label="Interactive"
                                current={interactiveProgress}
                                total={100}
                                color="pink"
                                animate={false}
                            />
                        </div>
                        <IconButton
                            icon={<FiPlus />}
                            tooltip="Increase"
                            onClick={handleIncreaseProgress}
                        />
                    </div>
                </div>
            </section>

            {/* Cards */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>Cards</h2>
                <div css={styles.cardsRow}>
                    {/* ProgressCard */}
                    <div css={styles.cardColumn}>
                        <span css={styles.cardColumnTitle}>ProgressCard</span>
                        <ProgressCard
                            color="red"
                            title="Workouts"
                            value="of the week"
                            progressLabel="3 concluídos"
                            current={3}
                            total={7}
                            displayMode="percentage"
                            onClick={() => alert('Workouts clicked!')}
                        />
                    </div>

                    {/* StatCard */}
                    <div css={styles.cardColumn}>
                        <span css={styles.cardColumnTitle}>StatCard</span>
                        <StatCard value={workoutCount} label="workouts" color="yellow" size="wide" onClick={() => alert('Workouts clicked!')} />
                        <StatCard value={workoutCount} label="workouts" color="blue" onClick={() => alert('Workouts clicked!')} />
                    </div>

                    {/* Card */}
                    <div css={styles.cardColumn}>
                        <span css={styles.cardColumnTitle}>Card</span>
                        <Card
                            color="green"
                            title={firstWorkout?.name ?? 'No workouts'}
                            description={`${firstWorkoutExerciseCount} exercises`}
                            onClick={() => alert('Workout clicked!')}
                        />
                    </div>

                    {/* FolderCard */}
                    <div css={styles.cardColumn}>
                        <span css={styles.cardColumnTitle}>FolderCard</span>
                        <FolderCard color="pink" title="Exercises" description="48 total" onClick={() => alert('Exercises clicked!')} />
                    </div>

                    {/* ActionCard */}
                    <div css={styles.cardColumn}>
                        <span css={styles.cardColumnTitle}>ActionCard</span>
                        <ActionCard
                            title="New Workout"
                            icon={<FiPlus />}
                            onClick={() => alert('New workout clicked!')}
                        />
                    </div>
                </div>
            </section>

            {/* Alert */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>Alert</h2>
                <div css={styles.row}>
                    <SecondaryButton
                        label="Success"
                        onClick={() => pushAlert('Operation completed successfully!', 'success')}
                    />
                    <SecondaryButton
                        label="Error"
                        onClick={() => pushAlert('Something went wrong. Please try again.', 'error')}
                    />
                    <SecondaryButton
                        label="Warning"
                        onClick={() => pushAlert('This action cannot be undone.', 'warning')}
                    />
                    <SecondaryButton
                        label="Info"
                        onClick={() => pushAlert('Your session will expire in 5 minutes.', 'info')}
                    />
                </div>
            </section>

            {/* Search (Autocomplete with backend) */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>Search (Autocomplete)</h2>
                <div css={styles.searchContainer}>
                    <AutocompleteInput
                        name="exercise-search"
                        label="Search Exercise"
                        inputValue={exerciseSearchValue}
                        onInputChange={handleExerciseSearch}
                        onFocus={handleExerciseSearchFocus}
                        suggestions={exerciseSuggestions}
                        onSelect={handleExerciseSelect}
                        placeholder="Type to search exercises..."
                        helperText="Searches the backend for exercises matching your input"
                        loading={isSearchingExercises}
                        minChars={2}
                    />
                </div>
            </section>

            {/* Form (Exercise) */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>Form (Exercise)</h2>
                <div ref={formContainerRef} css={styles.formContainer}>
                    <Form
                        containerRef={formContainerRef}
                        fields={exerciseFormFields}
                        totalSlots={12}
                        values={formValues}
                        onChange={handleFormChange}
                        errors={formErrors}
                        onValidationChange={setIsFormValid}
                    />
                </div>
                <div css={styles.formActions}>
                    <SecondaryButton label="Clear" onClick={handleFormClear} />
                    <PrimaryButton
                        label="Submit"
                        onClick={handleFormSubmit}
                        disabled={!isFormValid}
                    />
                </div>
            </section>

        </div>
    );
}

export default App;
