import { useState, useEffect } from 'react';
import Layout from '../../components/Layout/index.tsx';
import Card from '../../components/Card/index.tsx';
import ExerciseService from '../../services/ExerciseService/index.ts';
import type { ExerciseReadDTO } from '../../dtos/ExerciseReadDTO/index.ts';
import styles from '../Exercises/index.style.tsx';

const ExercisesFavoritesView = () => {
    const [favorites, setFavorites] = useState<ExerciseReadDTO[]>([]);

    useEffect(() => {
        ExerciseService.getFavorites().then(setFavorites);
    }, []);

    return (
        <Layout>
            <ul css={styles.resultList}>
                {favorites.map(e => (
                    <li key={e.id}>
                        <Card>{e.name}</Card>
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

export default ExercisesFavoritesView;
