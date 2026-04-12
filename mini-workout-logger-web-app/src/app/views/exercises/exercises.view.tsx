import { useState } from 'react';
import Layout from '../../components/layout/layout.component.tsx';
import Search from '../../components/search/search.component.tsx';
import { useExercises } from '../../hooks/useExercises.tsx';
import styles from './exercises.view.style.tsx';

const ExercisesView = () => {
    const { exercises, loading, error } = useExercises();
    const [query, setQuery] = useState('');

    const filtered = exercises.filter(e =>
        e.name.toLowerCase().includes(query.toLowerCase())
    );

    const results = (
        <ul css={styles.resultList}>
            {filtered.map(e => (
                <li key={e.id} css={styles.resultItem}>{e.name}</li>
            ))}
        </ul>
    );

    return (
        <Layout>
            {error && <p>{error}</p>}
            <Search
                value={query}
                onChange={setQuery}
                placeholder="Search exercises..."
                results={loading ? null : results}
            />
        </Layout>
    );
};

export default ExercisesView;
