import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import Layout from '../../components/layout/layout.component.tsx';
import PrimaryButton from '../../components/button/button.primary.component.tsx';
import Search from '../../components/search/search.component.tsx';
import WorkoutCard from '../../components/workout-card/workout-card.component.tsx';
import { useWorkouts } from '../../hooks/useWorkouts.tsx';
import styles from './workouts.view.style.tsx';

const WorkoutsView = () => {
    const { workouts } = useWorkouts();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const filtered = workouts.filter((w) =>
        w.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Layout>
            <div css={styles.pageWrapper}>
                <div css={styles.toolbar}>
                    <Search
                        value={search}
                        onChange={setSearch}
                        placeholder="Search workouts..."
                        customCss={styles.search}
                    />
                    <PrimaryButton icon={<MdAdd />}>
                        Add workout
                    </PrimaryButton>
                </div>

                <div css={styles.grid}>
                    {filtered.map((workout) => (
                            <WorkoutCard
                            key={workout.id}
                            workout={workout}
                            onStart={() => navigate(`/workouts/${workout.id}?mode=play`)}
                            onOpen={() => navigate(`/workouts/${workout.id}`)}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default WorkoutsView;
