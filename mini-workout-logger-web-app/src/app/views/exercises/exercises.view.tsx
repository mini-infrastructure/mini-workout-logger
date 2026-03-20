import Layout from "../../components/layout/layout.component.tsx";
import styles from "./exercises.view.style.tsx";
import {useExercises} from "../../hooks/useExercises.tsx";
import ExerciseCard from "../../components/exercise/exercise-card.component.tsx";
import PrimaryButton from "../../components/button/button.primary.component.tsx";
import {MdAdd, MdFilterAltOff} from "react-icons/md";
import {useState} from "react";
import ExerciseModal from "../../components/exercise/exercise-modal-component.tsx";
import {FaSearch} from "react-icons/fa";
import {HiAdjustmentsHorizontal} from "react-icons/hi2";
import Button from "../../components/button/button.component.tsx";
import {useMuscles} from "../../hooks/useMuscles.tsx";
import Badge from "../../components/badge/badge.component.tsx";
import {useRootMuscles} from "../../hooks/useRootMuscles.tsx";
import {FcDislike} from "react-icons/fc";
import {RootMuscleIcons} from "../../models/muscle.model.tsx";
import {
    exerciseCategoryOptions,
    exerciseDifficultyOptions,
    exerciseEquipmentOptions, exerciseForceOptions, exerciseMechanicsOptions,
    exerciseMuscleMovementClassificationOptions, exerciseRoleOptions, exerciseTypeOptions
} from "../../models/exercise.model.tsx";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const ExerciseFilters = {
    equipment: { label: 'Equipment' },
    muscles: { label: 'Muscles' },
    category: { label: 'Category' },
    difficulty: { label: 'Difficulty' },
    force: { label: 'Force' },
    mechanics: { label: 'Mechanics' },
    role: { label: 'Role' },
    type: { label: 'Type' },
    movementClassification: { label: 'Movement Classification' },
};

export type ExerciseFilterKey = keyof typeof ExerciseFilters;

const ExercisesDatabaseView = () => {
    const { exercises } = useExercises();
    const { muscles } = useMuscles();
    const { rootMuscles } = useRootMuscles();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFiltersWrapperOpen, setIsFiltersWrapperOpen] = useState(false);

    const [filters, setFilters] = useState<Record<string, string[]>>({});

    const navigate = useNavigate();

    const handleBadgeClick = (filter: ExerciseFilterKey, value: string) => {
        setFilters(prev => {
            const current = prev[filter] ?? [];

            const exists = current.includes(value);

            const updated = exists
                ? current.filter(v => v !== value)
                : [...current, value];

            return {
                ...prev,
                [filter]: updated,
            };
        });
    };

    const hasActiveFilters = Object.values(filters).some(
        (values) => values.length > 0
    );

    const clearFilters = () => {
        setFilters({});
    };

    console.log(filters);

    return (
        <Layout>
            <div css={styles.actionsWrapper}>
                <div css={styles.headerWrapper}>
                    <div css={styles.header}>Exercises Database</div>
                    <div>{exercises.length} {exercises.length === 1 ? 'exercise' : 'exercises'}</div>
                </div>

                <PrimaryButton
                    icon={<MdAdd/>}
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Exercise
                </PrimaryButton>
            </div>

            {/* Search bar */}
            <div css={styles.searchAndFilterBtnWrapper}>
                <div css={styles.searchBar}>
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search exercises..."
                    />
                </div>
                <Button
                    icon={<HiAdjustmentsHorizontal/>}
                    customCss={styles.filterButton(isFiltersWrapperOpen)}
                    customIconCss={styles.filterButtonIcon}
                    onClick={() => setIsFiltersWrapperOpen(prev => !prev)}
                >
                    Filter
                </Button>
            </div>

            <div css={styles.rootMuscleBadgesWrapper}>
                {rootMuscles.map(muscle => (
                    <Badge
                        key={muscle}
                        customCss={styles.rootMuscleBadges}
                        icon={RootMuscleIcons[muscle] || <FcDislike />}
                        onClick={() => handleBadgeClick("muscles", muscle)}
                        selected={filters.muscles?.includes(muscle)}
                        variant="primary"
                    >
                        {muscle}
                    </Badge>
                ))}
                {hasActiveFilters && (
                    <Button
                        onClick={clearFilters}
                        icon={<MdFilterAltOff />}
                    >
                        Clear filters
                    </Button>
                )}
            </div>

            <div css={styles.cardsAndFiltersWrapper}>
                <div css={styles.cardsWrapper}>
                    {exercises.map((exercise) => (
                        <ExerciseCard
                            key={exercise.id}
                            exercise={exercise}
                            customCss={styles.col}
                            onClick={() =>
                                navigate(`/exercises/${exercise.id}`, {
                                    state: { exercise }
                                })
                            }
                            onBadgeClick={handleBadgeClick}
                            filters={filters}
                        />
                    ))}
                </div>

                <div css={styles.filtersWrapper(isFiltersWrapperOpen)}>

                    <div css={styles.filterOptions}>
                        <div css={styles.filterOptionHeader}>{ExerciseFilters.equipment.label}</div>
                        <div css={styles.filterOptionContent}>
                            {exerciseEquipmentOptions.map(item => (
                                <Badge
                                    key={item.value}
                                    onClick={() => handleBadgeClick("equipment", item.value)}
                                    selected={filters.equipment?.includes(item.value)}
                                >
                                    {item.label}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div css={styles.filterOptions}>
                        <div css={styles.filterOptionHeader}>{ExerciseFilters.muscles.label}</div>
                        <div css={styles.filterOptionContent}>
                            {muscles.map((muscle) => (
                                <Badge
                                    key={muscle.id}
                                    onClick={() => handleBadgeClick("muscles", muscle.name)}
                                    selected={filters.muscles?.includes(String(muscle.id))}
                                >
                                    {muscle.name}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div css={styles.filterOptions}>
                        <div css={styles.filterOptionHeader}>{ExerciseFilters.category.label}</div>
                        <div css={styles.filterOptionContent}>
                            {exerciseCategoryOptions.map((item) => (
                                <Badge
                                    key={item.value}
                                    onClick={() => handleBadgeClick("category", item.value)}
                                    selected={filters.category?.includes(item.value)}
                                >
                                    {item.label}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div css={styles.filterOptions}>
                        <div css={styles.filterOptionHeader}>{ExerciseFilters.difficulty.label}</div>
                        <div css={styles.filterOptionContent}>
                            {exerciseDifficultyOptions.map((item) => (
                                <Badge
                                    key={item.value}
                                    onClick={() => handleBadgeClick("difficulty", item.value)}
                                    selected={filters.difficulty?.includes(item.value)}
                                >
                                    {item.label}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div css={styles.filterOptions}>
                        <div css={styles.filterOptionHeader}>{ExerciseFilters.force.label}</div>
                        <div css={styles.filterOptionContent}>
                            {exerciseForceOptions.map((item) => (
                                <Badge
                                    key={item.value}
                                    onClick={() => handleBadgeClick("force", item.value)}
                                    selected={filters.force?.includes(item.value)}
                                >
                                    {item.label}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div css={styles.filterOptions}>
                        <div css={styles.filterOptionHeader}>{ExerciseFilters.mechanics.label}</div>
                        <div css={styles.filterOptionContent}>
                            {exerciseMechanicsOptions.map((item) => (
                                <Badge
                                    key={item.value}
                                    onClick={() => handleBadgeClick("mechanics", item.value)}
                                    selected={filters.mechanics?.includes(item.value)}
                                >
                                    {item.label}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div css={styles.filterOptions}>
                        <div css={styles.filterOptionHeader}>{ExerciseFilters.role.label}</div>
                        <div css={styles.filterOptionContent}>
                            {exerciseRoleOptions.map((item) => (
                                <Badge
                                    key={item.value}
                                    onClick={() => handleBadgeClick("role", item.value)}
                                    selected={filters.role?.includes(item.value)}
                                >
                                    {item.label}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div css={styles.filterOptions}>
                        <div css={styles.filterOptionHeader}>{ExerciseFilters.type.label}</div>
                        <div css={styles.filterOptionContent}>
                            {exerciseTypeOptions.map((item) => (
                                <Badge
                                    key={item.value}
                                    onClick={() => handleBadgeClick("type", item.value)}
                                    selected={filters.type?.includes(item.value)}
                                >
                                    {item.label}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div css={styles.filterOptions}>
                        <div css={styles.filterOptionHeader}>{ExerciseFilters.movementClassification.label}</div>
                        <div css={styles.filterOptionContent}>
                            {exerciseMuscleMovementClassificationOptions.map((item) => (
                                <Badge
                                    key={item.value}
                                    onClick={() => handleBadgeClick("movementClassification", item.value)}
                                    selected={filters.movementClassification?.includes(item.value)}
                                >
                                    {item.label}
                                </Badge>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <ExerciseModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </Layout>
    );
};

export default ExercisesDatabaseView;
