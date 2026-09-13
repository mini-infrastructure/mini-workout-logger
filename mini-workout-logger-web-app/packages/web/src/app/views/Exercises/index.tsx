import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { FiPlus, FiFilter, FiChevronDown, FiSearch } from 'react-icons/fi';
import { FaHeart, FaDumbbell } from 'react-icons/fa';
import {
    exerciseCategoryOptions,
    exerciseDifficultyOptions,
    exerciseEquipmentOptions,
    exerciseForceOptions,
    exerciseMechanicsOptions,
    exerciseRoleOptions,
    exerciseTypeOptions,
    energySystemOptions,
    ExerciseCategoryVariants,
    type ExerciseReadDTO,
} from '@mini/shared';

import Layout from '../../components/Layout';
import TextInput from '../../components/TextInput';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import IconButton from '../../components/IconButton';
import Dropdown, { type DropdownOption } from '../../components/Dropdown';
import Cell from '../../components/Cell';
import { useExercises, type ExerciseFilters } from './useExercises';
import styles from './index.style';

type FilterConfig = {
    key: keyof ExerciseFilters;
    label: string;
    options: DropdownOption[];
};

const filterConfigs: FilterConfig[] = [
    { key: 'category', label: 'Category', options: exerciseCategoryOptions },
    { key: 'difficulty', label: 'Difficulty', options: exerciseDifficultyOptions },
    { key: 'equipment', label: 'Equipment', options: exerciseEquipmentOptions },
    { key: 'force', label: 'Force', options: exerciseForceOptions },
    { key: 'mechanics', label: 'Mechanics', options: exerciseMechanicsOptions },
    { key: 'type', label: 'Type', options: exerciseTypeOptions },
    { key: 'role', label: 'Role', options: exerciseRoleOptions },
    { key: 'energy_system', label: 'Energy', options: energySystemOptions },
];

const ExercisesView = () => {
    const {
        exercises,
        muscles,
        filters,
        loading,
        loadingMore,
        hasMore,
        totalElements,
        updateFilter,
        loadMore,
    } = useExercises();

    // Filter dropdown states
    const [openFilter, setOpenFilter] = useState<keyof ExerciseFilters | null>(null);
    const [muscleFilterOpen, setMuscleFilterOpen] = useState(false);

    // Infinite scroll sentinel ref
    const sentinelRef = useRef<HTMLDivElement>(null);

    // Muscle filter options (root and level 1 only)
    const muscleFilterOptions = useMemo(() => {
        const rootCodes = new Set(
            muscles.filter(m => !m.parent_code).map(m => m.code)
        );
        const filteredMuscles = muscles.filter(m =>
            !m.parent_code || rootCodes.has(m.parent_code)
        );
        return filteredMuscles
            .map(m => ({ value: m.code ?? '', label: m.name }))
            .filter(opt => opt.value);
    }, [muscles]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasMore, loading, loadingMore, loadMore]);

    // Handle search input
    const handleSearchChange = useCallback((value: string) => {
        updateFilter('name', value);
    }, [updateFilter]);

    // Handle filter change
    const handleFilterChange = useCallback((key: keyof ExerciseFilters, values: string[]) => {
        updateFilter(key, values);
    }, [updateFilter]);

    // Toggle filter dropdown
    const toggleFilter = useCallback((key: keyof ExerciseFilters) => {
        setOpenFilter(prev => prev === key ? null : key);
    }, []);

    // Close filter dropdown
    const closeFilter = useCallback(() => {
        setOpenFilter(null);
    }, []);

    // Map exercise to Cell fields
    const getExerciseFields = (exercise: ExerciseReadDTO) => {
        const fields = [];
        if (exercise.category) {
            fields.push({ label: 'Category', value: exercise.category.replace(/_/g, ' ') });
        }
        if (exercise.equipment) {
            fields.push({ label: 'Equipment', value: exercise.equipment.replace(/_/g, ' ') });
        }
        if (exercise.mechanics) {
            fields.push({ label: 'Mechanics', value: exercise.mechanics });
        }
        return fields;
    };

    // Get accent color based on category
    const getExerciseColor = (exercise: ExerciseReadDTO) => {
        if (!exercise.category) return 'blue';
        const variant = ExerciseCategoryVariants[exercise.category];
        const colorMap: Record<string, 'red' | 'yellow' | 'blue' | 'green' | 'pink'> = {
            danger: 'red',
            warning: 'yellow',
            primary: 'blue',
            success: 'green',
            purple: 'pink',
            orange: 'yellow',
        };
        return colorMap[variant] ?? 'blue';
    };

    // Handle exercise click
    const handleExerciseClick = (exercise: ExerciseReadDTO) => {
        // TODO: Open exercise drawer
        console.log('Open exercise:', exercise.id);
    };

    return (
        <Layout>
            <div css={styles.container}>
                {/* Header: Search + Add button */}
                <div css={styles.header}>
                    <div css={styles.searchRow}>
                        <div css={styles.searchContainer}>
                            <TextInput
                                name="search"
                                label="Search exercises"
                                value={filters.name}
                                onChange={handleSearchChange}
                                placeholder="Type to search..."
                                icon={<FiSearch />}
                                iconPosition="left"
                                showClearButton={filters.name.length > 0}
                                rightElement={
                                    <div css={styles.muscleFilterContainer}>
                                        <IconButton
                                            icon={<FiFilter />}
                                            tooltip="Filter by muscles"
                                            onClick={() => setMuscleFilterOpen(prev => !prev)}
                                            customCss={muscleFilterOpen ? styles.muscleFilterButtonActive : styles.muscleFilterButton}
                                        />
                                        {filters.muscles.length > 0 && (
                                            <span css={styles.filterBadge}>{filters.muscles.length}</span>
                                        )}
                                        <Dropdown
                                            options={muscleFilterOptions}
                                            value={filters.muscles}
                                            onChange={(values) => handleFilterChange('muscles', values as string[])}
                                            multiple
                                            open={muscleFilterOpen}
                                            onClose={() => setMuscleFilterOpen(false)}
                                            selectAll
                                            selectAllLabel="All muscles"
                                            emptyMessage="No muscles found"
                                            customCss={styles.muscleFilterDropdown}
                                        />
                                    </div>
                                }
                            />
                        </div>
                        <PrimaryButton
                            label="Add Exercise"
                            icon={<FiPlus />}
                            onClick={() => {
                                // TODO: Open add exercise modal
                                console.log('Add exercise');
                            }}
                            customCss={styles.addButton}
                        />
                    </div>

                    {/* Filter buttons */}
                    <div css={styles.filtersRow}>
                        {filterConfigs.map(({ key, label, options }) => {
                            const selectedValues = filters[key] as string[];
                            const isOpen = openFilter === key;
                            const hasSelection = selectedValues.length > 0;

                            return (
                                <div key={key} css={styles.filterButtonContainer}>
                                    <SecondaryButton
                                        label={label}
                                        icon={<FiChevronDown />}
                                        iconPosition="right"
                                        onClick={() => toggleFilter(key)}
                                        isSelected={isOpen || hasSelection}
                                    />
                                    {hasSelection && (
                                        <span css={styles.filterBadge}>{selectedValues.length}</span>
                                    )}
                                    <Dropdown
                                        options={options}
                                        value={selectedValues}
                                        onChange={(values) => handleFilterChange(key, values as string[])}
                                        multiple
                                        open={isOpen}
                                        onClose={closeFilter}
                                        selectAll
                                        emptyMessage="No options"
                                        customCss={styles.filterDropdown}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Content: Exercise cells */}
                <div css={styles.content}>
                    {loading && exercises.length === 0 ? (
                        <div css={styles.emptyState}>
                            <span css={styles.emptyText}>Loading exercises...</span>
                        </div>
                    ) : exercises.length === 0 ? (
                        <div css={styles.emptyState}>
                            <FaDumbbell css={styles.emptyIcon} />
                            <span css={styles.emptyText}>No exercises found</span>
                        </div>
                    ) : (
                        <>
                            <span css={styles.resultCount}>
                                {totalElements} exercise{totalElements !== 1 ? 's' : ''} found
                            </span>
                            <div css={styles.cellsContainer}>
                                <div css={styles.cellsGrid}>
                                    {exercises.map((exercise) => (
                                        <div
                                            key={exercise.id}
                                            css={styles.cellWrapper}
                                            onClick={() => handleExerciseClick(exercise)}
                                        >
                                            <Cell
                                                title={exercise.name}
                                                description={exercise.group_name}
                                                color={getExerciseColor(exercise)}
                                                fields={getExerciseFields(exercise)}
                                                isFavorite={exercise.favorited}
                                                onFavoriteToggle={(isFav) => {
                                                    // TODO: Toggle favorite
                                                    console.log('Toggle favorite:', exercise.id, isFav);
                                                }}
                                                favoriteIcon={<FaHeart />}
                                                favoriteIconSelected={<FaHeart fill="currentColor" />}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Sentinel for infinite scroll */}
                                <div ref={sentinelRef} css={styles.sentinel} />

                                {loadingMore && (
                                    <div css={styles.loadingMore}>
                                        Loading more...
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ExercisesView;
