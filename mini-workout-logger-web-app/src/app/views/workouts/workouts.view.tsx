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
    return (
            <Layout />
    );
};

export default WorkoutsView;
