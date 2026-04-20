import { MdAdd } from 'react-icons/md';
import Layout from '../../components/layout/layout.component.tsx';
import PrimaryButton from '../../components/button/button.primary.component.tsx';
import WorkoutCard from '../../components/workout-card/workout-card.component.tsx';
import { useWorkouts } from '../../hooks/useWorkouts.tsx';
import styles from './workouts.view.style.tsx';

const WorkoutsView = () => {
    const { workouts } = useWorkouts();

    return (
        <Layout>
            <div css={styles.pageWrapper}>
                <div css={styles.toolbar}>
                    <PrimaryButton icon={<MdAdd />}>
                        Add workout
                    </PrimaryButton>
                </div>

                <div css={styles.grid}>
                    {workouts.map((workout) => (
                        <WorkoutCard key={workout.id} workout={workout} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default WorkoutsView;
