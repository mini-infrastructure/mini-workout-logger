import {useEffect, useState} from "react";
import type {WorkoutReadDTO} from "../dtos/workout-read.dto.tsx";
import WorkoutService from "../services/workout.service.tsx";

export function useWorkouts() {
    const [workouts, setWorkouts] = useState<WorkoutReadDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        WorkoutService.getAll()
            .then((data) => {
                setWorkouts(data ?? []);
            })
            .catch(() => {
                setError('Error fetching workouts');
                setWorkouts([]);
            })
            .finally(() => setLoading(false));
    }, []);

    return { workouts, loading, error };
}
