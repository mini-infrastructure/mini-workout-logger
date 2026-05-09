import {useEffect, useState} from 'react';
import Layout from '../../components/layout/layout.component.tsx';
import Card from '../../components/card/card.component.tsx';
import ExerciseService from '../../services/exercise.service.tsx';
import type {ExerciseReadDTO} from '../../dtos/exercise-read.dto.tsx';
import styles from './exercises.view.style.tsx';

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
