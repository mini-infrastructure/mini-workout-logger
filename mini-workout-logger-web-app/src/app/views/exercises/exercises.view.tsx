import Layout from "../../components/layout/layout.component.tsx";
import styles from "./exercises.view.style.tsx";
import {useExercises} from "../../hooks/useExercises.tsx";
import ExerciseCard from "../../components/exercise/exercise-card.component.tsx";
import PrimaryButton from "../../components/button/button.primary.component.tsx";
import {MdAdd} from "react-icons/md";
import {useState} from "react";
import ExerciseModal from "../../components/exercise/exercise-modal-component.tsx";

const ExercisesDatabaseView = () => {
    const { exercises } = useExercises();

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Layout>
            <div css={styles.actionsWrapper}>
                <PrimaryButton
                    icon={<MdAdd/>}
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Exercise
                </PrimaryButton>

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
            />
        </Layout>
    );
};

export default ExercisesDatabaseView;
