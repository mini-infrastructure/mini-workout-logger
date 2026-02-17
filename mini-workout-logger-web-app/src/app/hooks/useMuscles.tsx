import {useEffect, useState} from 'react';
import MuscleService from '../services/muscle.service';
import type {MuscleReadDTO} from '../dtos/muscle-read.dto';

export function useMuscles() {
    const [muscles, setMuscles] = useState<MuscleReadDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        MuscleService.getAll()
            .then(setMuscles)
            .catch(() => setError('Error fetching muscles'))
            .finally(() => setLoading(false));
    }, []);

    return { muscles, loading, error };
}
