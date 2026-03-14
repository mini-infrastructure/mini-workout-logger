import Layout from "../../components/layout/layout.component.tsx";
import styles from "./exercises.view.style.tsx";
import {useExercises} from "../../hooks/useExercises.tsx";
import ExerciseCard from "../../components/exercise/exercise-card.component.tsx";
import PrimaryButton from "../../components/button/button.primary.component.tsx";
import {MdAdd} from "react-icons/md";
import {useState} from "react";
import ExerciseModal from "../../components/exercise/exercise-modal-component.tsx";
import {FaSearch} from "react-icons/fa";
import SecondaryButton from "../../components/button/button.secondary.component.tsx";
import {HiAdjustmentsHorizontal} from "react-icons/hi2";
import Button from "../../components/button/button.component.tsx";
import {useMuscles} from "../../hooks/useMuscles.tsx";
import Badge from "../../components/badge/badge.component.tsx";
import {useRootMuscles} from "../../hooks/useRootMuscles.tsx";
import {FcDislike} from "react-icons/fc";
import {RootMuscleIcons} from "../../models/muscle.model.tsx";

const ExercisesDatabaseView = () => {
    const { exercises } = useExercises();
    const { muscles } = useMuscles();
    const { rootMuscles } = useRootMuscles();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFiltersWrapperOpen, setIsFiltersWrapperOpen] = useState(false);

    return (
        <Layout>
            <div css={styles.actionsWrapper}>
                <div css={styles.headerWrapper}>
                    <div css={styles.header}>Exercises Database</div>
                    <div>16 of 16 exercises</div>
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
                    >
                        {muscle}
                    </Badge>
                ))}
            </div>

            <div css={styles.filtersWrapper(isFiltersWrapperOpen)}>
                Filtros
            </div>

            <div css={styles.cardsWrapper}>
                {exercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        customCss={styles.col}
                    />
                ))}
            </div>

            <ExerciseModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                muscles={muscles}
            />
        </Layout>
    );
};

export default ExercisesDatabaseView;
