import type {ExerciseReadDTO} from "../../dtos/ExerciseReadDTO";
import {useEffect, useState} from "react";
import ExerciseService from "../../services/ExerciseService";

export function useExercise(id: string) {
    const [exercise, setExercise] = useState<ExerciseReadDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        ExerciseService.getById(id)
            .then((data) => {
                setExercise(Array.isArray(data) ? data[0] : data);
            })
            .catch(() => {
                setError('Error getting exercises');
                setExercise(null);
            })
            .finally(() => setLoading(false));
    }, [id]);

    return { exercise, loading, error };
}
