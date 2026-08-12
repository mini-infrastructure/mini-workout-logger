import {useEffect, useState} from 'react';
import MuscleService from '../../services/MuscleService/index';
import type {MuscleReadDTO} from '../../dtos/MuscleReadDTO/index';

export function useMuscles() {
    const [muscles, setMuscles] = useState<MuscleReadDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        MuscleService.getAll()
            .then(setMuscles)
            .catch(() => setError('Error getting muscles'))
            .finally(() => setLoading(false));
    }, []);

    return { muscles, loading, error };
}
