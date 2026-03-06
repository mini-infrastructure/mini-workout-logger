import Modal from "../modal/modal.component.tsx";
import FormBuilder, {FormItem} from "../input/form/form.input.component.tsx";
import PrimaryButton from "../button/button.primary.component.tsx";
import styles from "./exercise-modal-component.style.tsx";
import {
    exerciseCategoryOptions,
    exerciseDifficultyOptions,
    exerciseEquipmentOptions
} from "../../models/exercise.model.tsx";
import type {ExerciseReadDTO} from "../../dtos/exercise-read.dto.tsx";
import ExerciseService from "../../services/exercise.service.tsx";
import {useMuscles} from "../../hooks/useMuscles.tsx";
import type {ExerciseWriteDTO} from "../../dtos/exercise-write.dto.tsx";

export type ExerciseModalProps = {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    exercise?: ExerciseReadDTO;
}

const ExerciseModal = ({
                           isModalOpen,
                           setIsModalOpen,
                           exercise,
                       }: ExerciseModalProps) => {
    const { muscles, loading, error } = useMuscles();

    const exerciseFormItems: FormItem[] = [
        {
            name: "name",
            label: "Name",
            type: "text",
            placeholder: "e.g. Bench Press",
            initialValue: exercise?.name || "",
            colSpan: 2,
        },
        {
            name: "category",
            label: "Category",
            type: "select",
            options: exerciseCategoryOptions,
            initialValue: exercise?.category || exerciseCategoryOptions[0].value,
            colSpan: 1,
        },
        {
            name: "difficulty",
            label: "Difficulty",
            type: "select",
            options: exerciseDifficultyOptions,
            initialValue: exercise?.difficulty || exerciseDifficultyOptions[0].value,
            colSpan: 1,
        },
        {
            name: "equipments",
            label: "Equipments",
            type: "multiselect",
            options: exerciseEquipmentOptions,
            initialValue: exercise?.equipments || [],
            colSpan: 2,
        },
        {
            name: "muscleIds",
            label: "Muscles",
            type: "multiselect",
            options: muscles.map(muscle => ({ label: muscle.name, value: muscle.id })),
            initialValue: exercise?.muscles.map(m => m.id) || [],
            colSpan: 2,
        },
    ];

    const handleSubmit = async (values: any) => {
        try {
            const payload: ExerciseWriteDTO = {
                name: values.name,
                category: values.category,
                difficulty: values.difficulty,
                equipments: values.equipments,
                muscle_ids: values.muscleIds,
            };

            if (exercise?.id) {
                await ExerciseService.update(exercise.id, payload);
            } else {
                await ExerciseService.create(payload);
            }

            setIsModalOpen(false);
            window.location.reload();

        } catch (error) {
            // Todo
        }
    };

    return (
        <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        >
            <div css={styles.header}>
                {exercise ? "Edit exercise" : "Create exercise"}
            </div>
            <FormBuilder
                items={exerciseFormItems}
                columns={2}
                onSubmit={handleSubmit}
                submitButton={<PrimaryButton type="submit">Save</PrimaryButton>}
            />
        </Modal>
    )
}

export default ExerciseModal;
