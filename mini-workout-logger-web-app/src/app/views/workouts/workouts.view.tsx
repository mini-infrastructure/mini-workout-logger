import Layout from "../../components/layout/layout.component.tsx";
import PrimaryButton from "../../components/button/button.primary.component.tsx";
import {MdAdd} from "react-icons/md";
import * as React from "react";
import styles from "./workouts.view.style.tsx";
import {useWorkouts} from "../../hooks/useWorkouts.tsx";
import {useState} from "react";
import ExerciseModal from "../../components/exercise/exercise-modal-component.tsx";
import Modal from "../../components/modal/modal.component.tsx";

const WorkoutsView = () => {
    const { workouts } = useWorkouts();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
            <Layout>
                <div css={styles.actionsWrapper}>
                    <div css={styles.headerWrapper}>
                        <div css={styles.header}>Workouts</div>
                        <div>{workouts.length} {workouts.length === 1 ? 'workout' : 'workouts'}</div>
                    </div>

                    <PrimaryButton
                        icon={<MdAdd/>}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Workout
                    </PrimaryButton>
                </div>

                <Modal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />

            </Layout>
    );
};

export default WorkoutsView;
