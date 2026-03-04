import Layout from "../../components/layout/layout.component.tsx";
import styles from "./exercises.view.style.tsx";
import {useExercises} from "../../hooks/useExercises.tsx";
import ExerciseCard from "../../components/exercise/exercise.component.tsx";
import ActionSwitch from "../../input/action/action.input.component.tsx";
import type {DropdownMenuItem} from "../../components/dropdown-menu/dropdown-menu.component.tsx";
import {FiCopy, FiEdit, FiTrash2} from "react-icons/fi";
import DropdownMenu from "../../components/dropdown-menu/dropdown-menu.component.tsx";

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
                <DropdownMenu title="Ações" items={items} />
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
