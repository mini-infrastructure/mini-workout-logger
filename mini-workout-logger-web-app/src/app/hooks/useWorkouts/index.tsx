import { useEffect, useState } from 'react';
import type { WorkoutReadDTO } from '../../dtos/WorkoutReadDTO/index.ts';
import WorkoutService from '../../services/WorkoutService/index.ts';

export function useWorkouts(tagIds: number[] = []) {
    const [workouts, setWorkouts] = useState<WorkoutReadDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const tagIdsKey = JSON.stringify(tagIds);

    useEffect(() => {
        setLoading(true);
        WorkoutService.getAll(tagIds)
            .then((data) => setWorkouts(data ?? []))
            .catch(() => {
                setError('Error getting workouts');
                setWorkouts([]);
            })
            .finally(() => setLoading(false));
        // tagIdsKey captures every change in tagIds by value.
    }, [tagIdsKey]);

    return { workouts, setWorkouts, loading, error };
}
