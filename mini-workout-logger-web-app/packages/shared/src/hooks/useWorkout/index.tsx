import { useEffect, useState } from 'react';
import type { WorkoutReadDTO } from '../../dtos/WorkoutReadDTO';
import WorkoutService from '../../services/WorkoutService';

export function useWorkout(id: string | undefined) {
    const [workout, setWorkout] = useState<WorkoutReadDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        WorkoutService.getById(id)
            .then((data) => setWorkout(data))
            .catch(() => setError('Error getting workout'))
            .finally(() => setLoading(false));
    }, [id]);

    return { workout, loading, error };
}
