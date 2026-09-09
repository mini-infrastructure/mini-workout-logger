import { useState, useRef, useEffect, useMemo } from 'react';
import { css } from '@emotion/react';
import { FiMenu, FiX, FiPlus, FiHeart, FiCheck, FiChevronDown, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import {
    useWorkouts,
    ExerciseService,
    MuscleService,
    exerciseCategoryOptions,
    exerciseDifficultyOptions,
    exerciseEquipmentOptions,
    exerciseForceOptions,
    exerciseMechanicsOptions,
    exerciseRoleOptions,
    exerciseTypeOptions,
    energySystemOptions,
    type MuscleReadDTO,
} from '@mini/shared';
import AutocompleteInput from './app/components/AutocompleteInput';
import Dropdown, { type DropdownOption } from './app/components/Dropdown';
import SegmentedControl, { type SegmentedControlOption } from './app/components/SegmentedControl';
import Cell, { type CellField } from './app/components/Cell';
import type { ExerciseReadDTO } from '@mini/shared';

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
        maxWidth: '35rem',
    }),
    searchWithFilter: css({
        width: '100%',
        maxWidth: '40rem',
    }),
    filterButtonContainer: css({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    }),
    filterButton: css({
        backgroundColor: 'transparent',
        border: 'none',
        color: 'var(--color-black)',

        '&:hover:not(:disabled)': {
            backgroundColor: 'var(--color-gray-light)',
            border: 'none',
            color: 'var(--color-black)',
        },
    }),
    filterButtonSelected: css({
        backgroundColor: 'var(--color-gray-light)',
        border: 'none',
        color: 'var(--color-black)',

        '&:hover:not(:disabled)': {
            backgroundColor: 'var(--color-gray-light)',
            border: 'none',
            color: 'var(--color-black)',
        },
    }),
    filterDropdown: css({
        borderRadius: 'var(--radius-sm)',
        border: 'var(--border-thin) solid var(--dropdown-separator)',
        top: 'calc(100% + var(--space-xs))',
        right: 0,
        left: 'auto',
        zIndex: 'calc(var(--z-dropdown) + 1)',
    }),
    filterBadge: css({
        position: 'absolute',
        top: '-0.25rem',
        right: '-0.25rem',
        width: '1rem',
        height: '1rem',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--color-red)',
        color: 'var(--color-white)',
        fontSize: 'var(--font-size-xs)',
        fontWeight: 'var(--font-weight-bold)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
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
    cellsGrid: css({
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--space-lg)',
        marginTop: 'var(--space-md)',
    }),
    cellsEmpty: css({
        padding: 'var(--space-xl)',
        textAlign: 'center',
        color: 'var(--color-gray)',
        fontSize: 'var(--font-size-sm)',
        border: '1px dashed var(--color-border)',
        borderRadius: 'var(--radius-md)',
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

    // SegmentedControl state
    const [segmentedIconValue, setSegmentedIconValue] = useState<string | undefined>('grid');
    const [segmentedTextValue, setSegmentedTextValue] = useState<string | undefined>('today');
    const [segmentedLargeValue, setSegmentedLargeValue] = useState<string | undefined>('workouts');

    const segmentedIconOptions: SegmentedControlOption[] = [
        { value: 'grid', icon: <FiGrid /> },
        { value: 'list', icon: <FiList /> },
    ];

    const segmentedTextOptions: SegmentedControlOption[] = [
        { value: 'today', label: 'Today' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
    ];

    const segmentedLargeOptions: SegmentedControlOption[] = [
        { value: 'workouts', label: 'Workouts' },
        { value: 'exercises', label: 'Exercises' },
        { value: 'progress', label: 'Progress' },
    ];

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

    // Filtered search state (search with muscle filter)
    const [filteredSearchValue, setFilteredSearchValue] = useState('');
    const [filteredSearchBaseResults, setFilteredSearchBaseResults] = useState<DropdownOption[]>([]);
    const [isSearchingFiltered, setIsSearchingFiltered] = useState(false);
    const [selectedMuscleFilters, setSelectedMuscleFilters] = useState<string[]>([]);
    const [muscleFilterOpen, setMuscleFilterOpen] = useState(false);
    const [allMuscles, setAllMuscles] = useState<MuscleReadDTO[]>([]);
    const filterButtonRef = useRef<HTMLDivElement>(null);

    // Cell showcase state
    const [selectedExercises, setSelectedExercises] = useState<ExerciseReadDTO[]>([]);
    const [favoriteExerciseIds, setFavoriteExerciseIds] = useState<Set<number>>(new Set());
    const [selectedCellId, setSelectedCellId] = useState<number | null>(null);

    // Sample cells for showcase (to test component independently)
    const [sampleFavorites, setSampleFavorites] = useState<Set<string>>(new Set());
    const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);

    const sampleCells = [
        {
            id: 'sample-1',
            title: 'Bench Press',
            description: 'Chest',
            color: 'red' as const,
            image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=100&h=100&fit=crop',
            fields: [
                { label: 'Category', value: 'Strength' },
                { label: 'Difficulty', value: 'Intermediate' },
                { label: 'Equipment', value: 'Barbell' },
                { label: 'Mechanics', value: 'Compound' },
            ],
        },
        {
            id: 'sample-2',
            title: 'Squat',
            description: 'Legs',
            color: 'blue' as const,
            image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=100&h=100&fit=crop',
            fields: [
                { label: 'Category', value: 'Strength' },
                { label: 'Difficulty', value: 'Advanced' },
            ],
        },
        {
            id: 'sample-3',
            title: 'Running',
            description: 'Cardio',
            color: 'green' as const,
            image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=100&h=100&fit=crop',
            fields: [
                { label: 'Category', value: 'Cardio' },
                { label: 'Energy', value: 'Aerobic' },
            ],
        },
        {
            id: 'sample-4',
            title: 'Yoga Flow',
            description: 'Mobility',
            color: 'pink' as const,
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop',
            fields: [
                { label: 'Category', value: 'Mobility' },
            ],
        },
        {
            id: 'sample-5',
            title: 'Deadlift',
            description: 'Back',
            color: 'yellow' as const,
            image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=100&h=100&fit=crop',
            fields: [
                { label: 'Category', value: 'Strength' },
                { label: 'Difficulty', value: 'Advanced' },
                { label: 'Equipment', value: 'Barbell' },
            ],
        },
    ];

    // Filter base results on frontend based on input value
    const filteredSearchSuggestions = useMemo(() => {
        if (filteredSearchBaseResults.length === 0) return [];
        if (!filteredSearchValue) return filteredSearchBaseResults;
        const query = filteredSearchValue.toLowerCase();
        return filteredSearchBaseResults.filter(opt =>
            opt.label.toLowerCase().includes(query)
        );
    }, [filteredSearchBaseResults, filteredSearchValue]);

    // Fetch muscles on mount
    useEffect(() => {
        MuscleService.getAll().then(setAllMuscles);
    }, []);

    // Filter muscles to show only root and level 1 (direct children of root)
    const muscleFilterOptions = useMemo(() => {
        const rootCodes = new Set(
            allMuscles.filter(m => !m.parent_code).map(m => m.code)
        );
        // Root muscles and level 1 (parent is a root muscle)
        const filteredMuscles = allMuscles.filter(m =>
            !m.parent_code || rootCodes.has(m.parent_code)
        );
        return filteredMuscles.map(m => ({
            value: m.code ?? '',
            label: m.name,
        })).filter(opt => opt.value);
    }, [allMuscles]);

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

    // Fetch exercises when muscle filters change
    const fetchExercisesForMuscleFilters = async (muscles: string[]) => {
        if (muscles.length === 0) {
            setFilteredSearchBaseResults([]);
            return;
        }
        setIsSearchingFiltered(true);
        try {
            const params: Record<string, string | number> = {
                size: 50,
                muscles: muscles.join(','),
            };
            const response = await ExerciseService.getAll(params);
            const options: DropdownOption[] = response.data.map(exercise => ({
                value: String(exercise.id),
                label: exercise.name,
            }));
            setFilteredSearchBaseResults(options);
        } catch {
            setFilteredSearchBaseResults([]);
        } finally {
            setIsSearchingFiltered(false);
        }
    };

    // Filtered search handlers (with muscle filter)
    const handleFilteredSearch = async (searchValue: string) => {
        setFilteredSearchValue(searchValue);

        // If no muscle filters, search via API like regular autocomplete
        if (selectedMuscleFilters.length === 0) {
            if (searchValue.length < 2) {
                setFilteredSearchBaseResults([]);
                return;
            }
            setIsSearchingFiltered(true);
            try {
                const response = await ExerciseService.getAll({ name: searchValue, size: 10 });
                const options: DropdownOption[] = response.data.map(exercise => ({
                    value: String(exercise.id),
                    label: exercise.name,
                }));
                setFilteredSearchBaseResults(options);
            } catch {
                setFilteredSearchBaseResults([]);
            } finally {
                setIsSearchingFiltered(false);
            }
        }
        // When muscle filters are selected, filtering happens via useMemo
    };

    const handleFilteredSearchSelect = async (option: DropdownOption) => {
        setFilteredSearchValue(option.label);
        setFilteredSearchBaseResults([]);

        // Fetch full exercise details and add to selected exercises
        try {
            const exercise = await ExerciseService.getById(option.value);

            // Add to selected exercises if not already present
            setSelectedExercises(prev => {
                const exists = prev.some(e => e.id === exercise.id);
                if (exists) return prev;
                return [...prev, exercise];
            });

            pushAlert(`Added exercise: ${option.label}`, 'success');
        } catch {
            pushAlert('Failed to load exercise details', 'error');
        }
    };

    const handleMuscleFilterChange = (muscles: string[]) => {
        setSelectedMuscleFilters(muscles);
        // Fetch new base results when filters change
        fetchExercisesForMuscleFilters(muscles);
    };

    const handleFilteredSearchFocus = () => {
        // If we have muscle filters but no base results loaded, fetch them
        if (selectedMuscleFilters.length > 0 && filteredSearchBaseResults.length === 0 && !isSearchingFiltered) {
            fetchExercisesForMuscleFilters(selectedMuscleFilters);
        }
        // If no muscle filters but input has text, search via API
        else if (selectedMuscleFilters.length === 0 && filteredSearchValue.length >= 2 && filteredSearchBaseResults.length === 0 && !isSearchingFiltered) {
            handleFilteredSearch(filteredSearchValue);
        }
    };

    const handleFormSubmit = async () => {
        try {
            const payload = {
                name: formValues.name as string,
                group_name: formValues.group_name as string,
                equipment: formValues.equipment,
                category: formValues.category || undefined,
                difficulty: formValues.difficulty || undefined,
                force: formValues.force || undefined,
                mechanics: formValues.mechanics || undefined,
                type: formValues.type || undefined,
                role: formValues.role || undefined,
                energy_system: formValues.energy_system || undefined,
                exercise_muscles: [],
            } as Parameters<typeof ExerciseService.create>[0];
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

    // Helper to convert exercise to Cell fields
    const exerciseToCellFields = (exercise: ExerciseReadDTO): CellField[] => {
        const fields: CellField[] = [];

        if (exercise.category) {
            fields.push({
                label: 'Category',
                value: exercise.category.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase()),
            });
        }

        if (exercise.difficulty) {
            fields.push({
                label: 'Difficulty',
                value: exercise.difficulty.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase()),
            });
        }

        if (exercise.equipment) {
            fields.push({
                label: 'Equipment',
                value: exercise.equipment.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase()),
            });
        }

        if (exercise.mechanics) {
            fields.push({
                label: 'Mechanics',
                value: exercise.mechanics.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase()),
            });
        }

        return fields;
    };

    // Helper to get a color based on exercise category
    const getCellColor = (exercise: ExerciseReadDTO): 'red' | 'yellow' | 'blue' | 'green' | 'pink' => {
        const categoryColors: Record<string, 'red' | 'yellow' | 'blue' | 'green' | 'pink'> = {
            STRENGTH: 'red',
            CARDIO: 'green',
            MOBILITY: 'blue',
            REHABILITATION: 'pink',
            POWER: 'yellow',
            FUNCTIONAL: 'green',
            WARM_UP: 'yellow',
            RECOVERY: 'pink',
        };
        return categoryColors[exercise.category ?? ''] ?? 'blue';
    };

    const handleCellFavoriteToggle = (exerciseId: number, isFavorite: boolean) => {
        setFavoriteExerciseIds(prev => {
            const newSet = new Set(prev);
            if (isFavorite) {
                newSet.add(exerciseId);
            } else {
                newSet.delete(exerciseId);
            }
            return newSet;
        });
    };

    const handleCellSelectionChange = (exerciseId: number, isSelected: boolean) => {
        setSelectedCellId(isSelected ? exerciseId : null);
    };

    const handleCellAction = (exercise: ExerciseReadDTO) => {
        pushAlert(`Opening exercise: ${exercise.name}`, 'info');
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

            {/* Segmented Control */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>SegmentedControl</h2>
                <div css={styles.row}>
                    <SegmentedControl
                        options={segmentedIconOptions}
                        selected={segmentedIconValue}
                        onSelect={setSegmentedIconValue}
                    />
                    <SegmentedControl
                        options={segmentedTextOptions}
                        selected={segmentedTextValue}
                        onSelect={setSegmentedTextValue}
                    />
                    <SegmentedControl
                        options={segmentedLargeOptions}
                        selected={segmentedLargeValue}
                        onSelect={setSegmentedLargeValue}
                        size="lg"
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

            {/* Search with Filter */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>Search with Filter</h2>
                <div css={styles.searchWithFilter}>
                    <AutocompleteInput
                        name="filtered-exercise-search"
                        label="Search Exercise"
                        inputValue={filteredSearchValue}
                        onInputChange={handleFilteredSearch}
                        onFocus={handleFilteredSearchFocus}
                        suggestions={filteredSearchSuggestions}
                        onSelect={handleFilteredSearchSelect}
                        placeholder="Type to search exercises..."
                        helperText={selectedMuscleFilters.length > 0
                            ? `Filtering by ${selectedMuscleFilters.length} muscle(s)`
                            : 'Click the filter button to filter by muscles'
                        }
                        loading={isSearchingFiltered}
                        minChars={selectedMuscleFilters.length > 0 ? 0 : 2}
                        rightElement={
                            <div ref={filterButtonRef} css={styles.filterButtonContainer}>
                                <IconButton
                                    icon={<FiFilter />}
                                    tooltip="Filter by muscles"
                                    onClick={() => setMuscleFilterOpen(prev => !prev)}
                                    customCss={muscleFilterOpen ? styles.filterButtonSelected : styles.filterButton}
                                />
                                {selectedMuscleFilters.length > 0 && (
                                    <span css={styles.filterBadge}>{selectedMuscleFilters.length}</span>
                                )}
                                <Dropdown
                                    options={muscleFilterOptions}
                                    value={selectedMuscleFilters}
                                    onChange={handleMuscleFilterChange}
                                    multiple
                                    open={muscleFilterOpen}
                                    onClose={() => setMuscleFilterOpen(false)}
                                    selectAll
                                    selectAllLabel="All muscles"
                                    emptyMessage="No muscles found"
                                    customCss={styles.filterDropdown}
                                />
                            </div>
                        }
                    />
                </div>
            </section>

            {/* Cell Component Showcase */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>Cell Component</h2>
                <div css={styles.cellsGrid}>
                    {sampleCells.map(cell => (
                        <Cell
                            key={cell.id}
                            title={cell.title}
                            description={cell.description}
                            image={cell.image}
                            color={cell.color}
                            fields={cell.fields}
                            actionLabel="View Details"
                            onAction={() => pushAlert(`Opening: ${cell.title}`, 'info')}
                            isFavorite={sampleFavorites.has(cell.id)}
                            onFavoriteToggle={isFavorite => {
                                setSampleFavorites(prev => {
                                    const newSet = new Set(prev);
                                    if (isFavorite) newSet.add(cell.id);
                                    else newSet.delete(cell.id);
                                    return newSet;
                                });
                            }}
                            favoriteIcon={<FiHeart />}
                            favoriteIconSelected={<FiHeart fill="currentColor" />}
                            isSelected={selectedSampleId === cell.id}
                            onSelectionChange={isSelected => setSelectedSampleId(isSelected ? cell.id : null)}
                        />
                    ))}
                </div>
            </section>

            {/* Exercise Cells (from search) */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>Exercise Cells (from search)</h2>
                {selectedExercises.length === 0 ? (
                    <div css={styles.cellsEmpty}>
                        Search and select exercises above to see them as cells
                    </div>
                ) : (
                    <div css={styles.cellsGrid}>
                        {selectedExercises.map(exercise => (
                            <Cell
                                key={exercise.id}
                                title={exercise.name}
                                description={exercise.group_name}
                                image={exercise.media?.[0]?.data ? `data:${exercise.media[0].content_type};base64,${exercise.media[0].data}` : undefined}
                                color={getCellColor(exercise)}
                                fields={exerciseToCellFields(exercise)}
                                actionLabel="View Details"
                                onAction={() => handleCellAction(exercise)}
                                isFavorite={favoriteExerciseIds.has(exercise.id)}
                                onFavoriteToggle={isFavorite => handleCellFavoriteToggle(exercise.id, isFavorite)}
                                favoriteIcon={<FiHeart />}
                                favoriteIconSelected={<FiHeart fill="currentColor" />}
                                isSelected={selectedCellId === exercise.id}
                                onSelectionChange={isSelected => handleCellSelectionChange(exercise.id, isSelected)}
                            />
                        ))}
                    </div>
                )}
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
