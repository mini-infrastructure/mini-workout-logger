import Layout from "../../components/layout/layout.component.tsx";
import styles from "./exercises.view.style.tsx";
import {useExercises} from "../../hooks/useExercises.tsx";
import ExerciseCard from "../../components/exercise/exercise-card.component.tsx";
import type {DropdownMenuItem} from "../../components/dropdown-menu/dropdown-menu.component.tsx";
import DropdownMenu from "../../components/dropdown-menu/dropdown-menu.component.tsx";
import {FiCopy, FiEdit, FiTrash2} from "react-icons/fi";
import PrimaryButton from "../../components/button/button.primary.component.tsx";
import {MdAdd} from "react-icons/md";

const items: DropdownMenuItem[] = [
    {
        label: "Edit",
        icon: <FiEdit size={14} />,
        iconColor: "primary",
        onClick: () => console.log("Edit"),
    },
    {
        label: "Clone",
        icon: <FiCopy size={14} />,
        iconColor: "info",
        onClick: () => console.log("Clone"),
    },
    {
        dividerBefore: true,
        label: "Delete",
        icon: <FiTrash2 size={14} />,
        iconColor: "danger",
        onClick: () => console.log("Delete"),
    },
];

const ExercisesDatabaseView = () => {
    const { exercises } = useExercises();
    console.log(exercises);
    return (
        <Layout
            navbarContent={
                <DropdownMenu
                    title="Actions"
                    items={items}
                    trigger="action-switch"
                />
            }
        >
            <div css={styles.actionsWrapper}>
                <PrimaryButton
                    icon={<MdAdd/>}
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
        </Layout>
    );
};

export default ExercisesDatabaseView;
