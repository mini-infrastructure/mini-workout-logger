import { useEffect, useState } from 'react';
import type { WorkoutReadDTO } from '../dtos/workout-read.dto.tsx';
import WorkoutService from '../services/workout.service.tsx';

export function useWorkout(id: string | undefined) {
    const [workout, setWorkout] = useState<WorkoutReadDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        WorkoutService.getById(id)
            .then((data) => setWorkout(data))
            .catch(() => setError('Error fetching workout'))
            .finally(() => setLoading(false));
    }, [id]);

    return { workout, loading, error };
}
