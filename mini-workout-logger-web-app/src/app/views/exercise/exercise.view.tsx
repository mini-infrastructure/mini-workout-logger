import {useLocation} from "react-router-dom";
import type {ExerciseReadDTO} from "../../dtos/exercise-read.dto.tsx";
import Layout from "../../components/layout/layout.component.tsx";
import FormBuilder, {FormItem} from "../../components/input/form/form.input.component.tsx";
import {useMemo} from "react";
import {
    exerciseCategoryOptions,
    exerciseDifficultyOptions,
    exerciseEquipmentOptions, exerciseForceOptions, exerciseMechanicsOptions,
    exerciseMuscleMovementClassificationOptions, exerciseRoleOptions, exerciseTypeOptions
} from "../../models/exercise.model.tsx";
import {useMuscles} from "../../hooks/useMuscles.tsx";
import {useExerciseGroupNames} from "../../hooks/useExerciseGroupNames.tsx";
import PrimaryButton from "../../components/button/button.primary.component.tsx";
import styles from "./exercise.view.style.tsx";

type LocationState = {
    exercise: ExerciseReadDTO;
};

const ExerciseView = () => {
    const location = useLocation();
    const { exercise } = location.state as LocationState;
    const { muscles } = useMuscles();
    const { exerciseGroupNames } = useExerciseGroupNames();

    const exerciseFormItems: FormItem[] = useMemo(() => [
        {
            name: "name",
            label: "Name",
            type: "text",
            placeholder: "e.g. Barbell Squat",
            initialValue: exercise?.name || "",
            colSpan: 4,
        },
        {
            name: "group_name",
            label: "Group name",
            type: "buttonselect",
            placeholder: "e.g. Squat",
            initialValue: exercise?.group_name || "",
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
            name: "exercise_muscles",
            label: "Muscles",
            type: "buttonmultiselect",
            colSpan: 2,
            options: {
                first: {
                    label: "Muscles",
                    options: (muscles ?? []).map(m => ({
                        label: m.name,
                        value: m.id,
                    })),
                    inputEnabled: false,
                },
                second: {
                    label: "Muscle Movement Classification",
                    options: exerciseMuscleMovementClassificationOptions,
                    inputEnabled: false,
                }
            },
            initialValue: exercise?.exercise_muscles?.map(m => ({
                first: String(m.muscle_name),
                second: m.role,
            })) ?? [],
        }
    ], [exercise, muscles, exerciseGroupNames]);

    const handleSubmit = async (values: any) => {};

    return (
        <Layout>
            <div css={styles.wrap}>
                <div css={styles.formContainer}>
                    <FormBuilder
                        items={exerciseFormItems}
                        columns={2}
                        onSubmit={handleSubmit}
                        submitButton={<PrimaryButton type="submit">Save</PrimaryButton>}
                        disabled={true}
                    />
                </div>
                <div css={styles.right}></div>
            </div>
        </Layout>
    );
};


export default ExerciseView;