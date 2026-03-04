import Layout from "../../components/layout/layout.component.tsx";
import styles from "./exercises.view.style.tsx";
import {useExercises} from "../../hooks/useExercises.tsx";
import ExerciseCard from "../../components/exercise/exercise.component.tsx";
import ButtonDropdown from "../../components/button/button-dropdown.component.tsx";

const ExercisesDatabaseView = () => {
    const { exercises } = useExercises();
    console.log(exercises);
    return (
        <Layout
            navbarContent={
                <ButtonDropdown />
            }
        >
            <div css={styles.cardsWrapper}>
                {exercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        customCss={styles.col}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default ExercisesDatabaseView;
