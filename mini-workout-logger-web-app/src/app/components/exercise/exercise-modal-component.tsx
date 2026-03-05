import Modal from "../modal/modal.component.tsx";
import FormBuilder, {FormItem} from "../../input/form/form.input.component.tsx";
import PrimaryButton from "../button/button.primary.component.tsx";
import styles from "./exercise-modal-component.style.tsx";
import {exerciseCategoryOptions, exerciseDifficultyOptions} from "../../models/exercise.model.tsx";

export type ExerciseModalProps = {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

export const exerciseFormItems: FormItem[] = [
    {
        name: "name",
        label: "Exercise Name",
        type: "text",
        placeholder: "e.g. Bench Press",
        colSpan: 2,
    },
    {
        name: "category",
        label: "Category",
        type: "select",
        options: exerciseCategoryOptions,
        colSpan: 1,
    },
    {
        name: "difficulty",
        label: "Difficulty",
        type: "select",
        options: exerciseDifficultyOptions,
        colSpan: 1,
    },
];

const ExerciseModal = ({
                           isModalOpen,
                           setIsModalOpen,
                       }: ExerciseModalProps) => {
    return (
        <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        >
            <FormBuilder
                items={exerciseFormItems}
                columns={2}
                onSubmit={(values) => console.log(values)}
                submitButton={<PrimaryButton type="submit" customCss={styles.submitButton}>Save</PrimaryButton>}
            />
        </Modal>
    )
}

export default ExerciseModal;
