import Modal from "../modal/modal.component.tsx";
import FormBuilder, {FormItem} from "../input/form/form.input.component.tsx";
import PrimaryButton from "../button/button.primary.component.tsx";
import styles from "./exercise-modal-component.style.tsx";
import {
    exerciseCategoryOptions,
    exerciseDifficultyOptions,
    exerciseEquipmentOptions, exerciseForceOptions, exerciseMechanicsOptions,
    exerciseMuscleMovementClassificationOptions, exerciseRoleOptions, exerciseTypeOptions
} from "../../models/exercise.model.tsx";
import type {ExerciseReadDTO} from "../../dtos/exercise-read.dto.tsx";
import ExerciseService from "../../services/exercise.service.tsx";
import {useMuscles} from "../../hooks/useMuscles.tsx";
import type {ExerciseWriteDTO} from "../../dtos/exercise-write.dto.tsx";
import {useExerciseGroupNames} from "../../hooks/useExerciseGroupNames.tsx";

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
    const { muscles } = useMuscles();
    const { exerciseGroupNames } = useExerciseGroupNames();

    const exerciseFormItems: FormItem[] = [
        {
            name: "name",
            label: "Name",
            type: "text",
            placeholder: "e.g. Barbell Squat",
            initialValue: exercise?.name || "",
            colSpan: 4,
        },
        {
            name: "groupName",
            label: "Group name",
            type: "buttonselect",
            placeholder: "e.g. Squat",
            initialValue: exercise?.groupName || "",
            colSpan: 4,
            options: exerciseGroupNames?.map(name => ({
                label: name,
                value: name,
            })),
        },
        {
            name: "category",
            label: "Category",
            type: "select",
            options: exerciseCategoryOptions,
            initialValue: exercise?.category,
            colSpan: 1,
        },
        {
            name: "difficulty",
            label: "Difficulty",
            type: "select",
            options: exerciseDifficultyOptions,
            initialValue: exercise?.difficulty,
            colSpan: 1,
        },
        {
            name: "equipment",
            label: "Equipment",
            type: "select",
            options: exerciseEquipmentOptions,
            initialValue: exercise?.equipment,
            colSpan: 1,
        },
        {
            name: "force",
            label: "Force",
            type: "select",
            options: exerciseForceOptions,
            initialValue: exercise?.force,
            colSpan: 1,
        },
        {
            name: "mechanics",
            label: "Mechanics",
            type: "select",
            options: exerciseMechanicsOptions,
            initialValue: exercise?.mechanics,
            colSpan: 1,
        },
        {
            name: "role",
            label: "Exercise role",
            type: "select",
            options: exerciseRoleOptions,
            initialValue: exercise?.role,
            colSpan: 1,
        },
        {
            name: "type",
            label: "Type",
            type: "select",
            options: exerciseTypeOptions,
            initialValue: exercise?.type,
            colSpan: 1,
        },
        {
            name: "muscles",
            label: "Muscles",
            type: "buttonmultiselect",
            colSpan: 2,
            options: [
                {
                    label: "Muscles",
                    options: muscles.map(m => ({
                        label: m.name,
                        value: m.id,
                    })),
                    inputEnabled: false
                },
                {
                    label: "Muscle Movement Classification",
                    options: exerciseMuscleMovementClassificationOptions,
                    inputEnabled: false,
                },
            ],
            initialValue: exercise?.exercise_muscles?.map(m => ({
                first: m.muscle_id,
                second: m.role,
            })) || [],
        },
    ];

    const handleSubmit = async (values: any) => {
        console.log(values);
        try {
            const payload: ExerciseWriteDTO = {
                name: values.name,
                groupName: values.groupName,
                category: values.category,
                difficulty: values.difficulty,
                equipment: values.equipment,
                force: values.force,
                mechanics: values.mechanics,
                role: values.role,
                type: values.type,
                exercise_muscles: values.muscles,
            };

            // if (exercise?.id) {
            //     await ExerciseService.update(exercise.id, payload);
            // } else {
            //     await ExerciseService.create(payload);
            // }
            //
            // setIsModalOpen(false);
            // window.location.reload();

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
