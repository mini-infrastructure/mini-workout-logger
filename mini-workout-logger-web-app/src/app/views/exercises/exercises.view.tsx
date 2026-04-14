import { useState, useEffect } from 'react';
import Layout from '../../components/layout/layout.component.tsx';
import Search from '../../components/search/search.component.tsx';
import ExerciseCard from '../../components/exercise-card/exercise-card.component.tsx';
import Pagination from '../../components/pagination/pagination.component.tsx';
import { useExercises } from '../../hooks/useExercises.tsx';
import ExerciseService from '../../services/exercise.service.tsx';
import styles from './exercises.view.style.tsx';

const ExercisesView = () => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);
    const { exercises, pagination, loading, error } = useExercises(query, page);
    const [favoritedIds, setFavoritedIds] = useState<Set<number>>(new Set());

    useEffect(() => {
        ExerciseService.getFavorites().then(favorites => {
            setFavoritedIds(new Set(favorites.map(e => e.id)));
        });
    }, []);

    const handleFavoriteToggle = (id: number, favorited: boolean) => {
        setFavoritedIds(prev => {
            const next = new Set(prev);
            favorited ? next.add(id) : next.delete(id);
            return next;
        });
    };

    const handleQueryChange = (value: string) => {
        setQuery(value);
        setPage(0);
    };

    return (
        <Layout>
            {error && <p>{error}</p>}
            <Search
                value={query}
                onChange={handleQueryChange}
                placeholder="Search exercises..."
                results={loading ? null : (
                    <>
                        <ul css={styles.resultList}>
                            {exercises.map(e => (
                                <li key={e.id}>
                                    <ExerciseCard
                                        exercise={e}
                                        isFavorited={favoritedIds.has(e.id)}
                                        onFavoriteToggle={handleFavoriteToggle}
                                    />
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
                )}
            />
        </Layout>
    );
};

export default ExercisesView;
