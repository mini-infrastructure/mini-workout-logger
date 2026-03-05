import Layout from "../../components/layout/layout.component.tsx";
import styles from "./exercises.view.style.tsx";
import {useExercises} from "../../hooks/useExercises.tsx";
import ExerciseCard from "../../components/exercise/exercise-card.component.tsx";
import type {DropdownMenuItem} from "../../components/dropdown-menu/dropdown-menu.component.tsx";
import DropdownMenu from "../../components/dropdown-menu/dropdown-menu.component.tsx";
import {FiCopy, FiEdit, FiTrash2} from "react-icons/fi";
import PrimaryButton from "../../components/button/button.primary.component.tsx";
import {MdAdd} from "react-icons/md";
import {useState} from "react";
import Modal from "../../components/modal/modal.component.tsx";
import type {FormItem} from "../../input/form/form.input.component.tsx";
import FormBuilder from "../../input/form/form.input.component.tsx";
import ExerciseModal from "../../components/exercise/exercise-modal-component.tsx";

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

const formItems: FormItem[] = [
    {
        name: "firstName",
        label: "First name",
        type: "text",
        placeholder: "Enter first name",
        colSpan: 1,
    },
    {
        name: "lastName",
        label: "Last name",
        type: "text",
        colSpan: 1,
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter email",
        colSpan: 2,
    },
    {
        name: "role",
        label: "Role",
        type: "select",
        colSpan: 2,
        options: [
            { label: "User", value: "user" },
            { label: "Admin", value: "admin" },
            { label: "Moderator", value: "moderator" },
        ],
    },
];

const ExercisesDatabaseView = () => {
    const { exercises } = useExercises();

    const [isModalOpen, setIsModalOpen] = useState(false);

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
