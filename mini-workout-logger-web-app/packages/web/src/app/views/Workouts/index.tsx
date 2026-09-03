import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import Layout from '../../components/Layout/index.tsx';
import PrimaryButton from '../../components/PrimaryButton/index.tsx';
import Search from '../../components/Search/index.tsx';
import Badge from '../../components/Badge/index.tsx';
import WorkoutCard from '../../components/WorkoutCard/index.tsx';
import { useWorkouts } from '@mini/shared';
import type { TagReadDTO } from '@mini/shared';
import styles from './index.style.tsx';

const WorkoutsView = () => {
    const { workouts } = useWorkouts();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

    const allTags = useMemo(() => {
        const seen = new Map<number, TagReadDTO>();
        workouts.forEach((w) => w.tags?.forEach((t) => seen.set(t.id, t)));
        return [...seen.values()];
    }, [workouts]);

    const handleTagToggle = (id: number) => {
        setSelectedTagIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const filtered = workouts.filter((w) => {
        const nameMatch = w.name.toLowerCase().includes(search.toLowerCase());
        const tagMatch =
            selectedTagIds.length === 0 ||
            selectedTagIds.every((id) => w.tags?.some((t) => t.id === id));
        return nameMatch && tagMatch;
    });

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

                {allTags.length > 0 && (
                    <div css={styles.tagFilterBar}>
                        {allTags.map((tag) => (
                            <Badge
                                key={tag.id}
                                variant="primary"
                                selected={selectedTagIds.includes(tag.id)}
                                onClick={() => handleTagToggle(tag.id)}
                            >
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                )}

                <div css={styles.grid}>
                    {filtered.map((workout) => (
                        <WorkoutCard
                            key={workout.id}
                            workout={workout}
                            onStart={() => navigate(`/workouts/${workout.id}?mode=play`)}
                            onOpen={() => navigate(`/workouts/${workout.id}`)}
                            selectedTagIds={selectedTagIds}
                            onTagClick={handleTagToggle}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default WorkoutsView;
