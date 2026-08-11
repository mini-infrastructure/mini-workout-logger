import { useEffect, useState } from 'react';
import type { WorkoutReadDTO } from '../../dtos/WorkoutReadDTO/index.ts';
import WorkoutService from '../../services/WorkoutService/index.ts';

export function useWorkouts(tagIds: number[] = []) {
    const [workouts, setWorkouts] = useState<WorkoutReadDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        WorkoutService.getAll(tagIds)
            .then((data) => setWorkouts(data ?? []))
            .catch(() => {
                setError('Error fetching workouts');
                setWorkouts([]);
            })
            .finally(() => setLoading(false));
    }, [JSON.stringify(tagIds)]);

    return { workouts, setWorkouts, loading, error };
}
