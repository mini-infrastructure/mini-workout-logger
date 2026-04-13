import { useState } from 'react';
import Layout from '../../components/layout/layout.component.tsx';
import Search from '../../components/search/search.component.tsx';
import ExerciseCard from '../../components/exercise-card/exercise-card.component.tsx';
import Pagination from '../../components/pagination/pagination.component.tsx';
import { useExercises } from '../../hooks/useExercises.tsx';
import styles from './exercises.view.style.tsx';

const ExercisesView = () => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);
    const { exercises, pagination, loading, error } = useExercises(query, page);

    const handleQueryChange = (value: string) => {
        setQuery(value);
        setPage(0);
    };

    const results = (
        <>
            <ul css={styles.resultList}>
                {exercises.map(e => (
                    <li key={e.id}>
                        <ExerciseCard exercise={e} />
                    </li>
                ))}
            </ul>
            {pagination && pagination.total_pages > 1 && (
                <Pagination
                    page={page}
                    totalPages={pagination.total_pages}
                    onPageChange={setPage}
                />
            )}
        </>
    );

    return (
        <Layout>
            {error && <p>{error}</p>}
            <Search
                value={query}
                onChange={handleQueryChange}
                placeholder="Search exercises..."
                results={loading ? null : results}
            />
        </Layout>
    );
};

export default ExercisesView;
