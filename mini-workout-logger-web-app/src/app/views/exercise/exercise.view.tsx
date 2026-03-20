import {useLocation, useParams} from "react-router-dom";
import type {ExerciseReadDTO} from "../../dtos/exercise-read.dto.tsx";
import Layout from "../../components/layout/layout.component.tsx";
import FormBuilder, {FormItem} from "../../components/input/form/form.input.component.tsx";
import {useMemo, useState} from "react";
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
import Button from "../../components/button/button.component.tsx";
import {FiEdit, FiTrash2} from "react-icons/fi";
import {useExercise} from "../../hooks/useExercise.tsx";
import Field from "../../components/field/field.component.tsx";

type LocationState = {
    exercise: ExerciseReadDTO;
};

const ExerciseView = () => {
    const location = useLocation();
    const { id } = useParams();

    const state = location.state as LocationState | null;

    const { exercise: fetchedExercise, loading } = useExercise(id!);

    const exercise = state?.exercise ?? fetchedExercise;

    const { muscles } = useMuscles();
    const { exerciseGroupNames } = useExerciseGroupNames();

    const [isDisabled, setIsDisabled] = useState(true);

    const toggleDisabled = () => setIsDisabled(prev => !prev);

    const handleSubmit = async (values: any) => {};

    return (
        <Layout
            navbarContent={
                <Button
                    onClick={toggleDisabled}
                    icon={<FiEdit />}
                    isClicked={!isDisabled}
                    clickedIcon={<FiTrash2 />}
                    customCss={styles.editCancelBtn(!isDisabled)}
                    customIconCss={styles.editCancelIconBtn(!isDisabled)}
                >
                    {isDisabled ? "Edit" : "Cancel"}
                </Button>
            }
        >
            <div css={styles.wrap}>
                <div css={styles.exerciseDescriptionWrapper}>
                    <Field header="Name" content={exercise?.name} />
                    <Field header="Equipment" content={exercise?.equipment} />
                    <Field header="Category" content={exercise?.category} />
                    <Field header="Muscles" content={exercise?.muscles?.map(muscle => muscle.name).join(", ")} />
                    <Field header="Exercise group name" content={exercise?.group_name} />
                    <Field header="Difficulty" content={exercise?.difficulty} />
                    <Field header="Type" content={exercise?.type} />
                    <Field header="Role" content={exercise?.role} />
                    <Field header="Force" content={exercise?.force} />
                    <Field header="Mechanics" content={exercise?.mechanics} />
                </div>
                <div css={styles.right}></div>
            </div>
        </Layout>
    );
};


export default ExerciseView;