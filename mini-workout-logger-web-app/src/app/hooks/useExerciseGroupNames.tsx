import ExerciseService from "../services/exercise.service.tsx";
import {useEffect, useState} from "react";

export function useExerciseGroupNames() {
    const [exerciseGroupNames, setExerciseGroupNames] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        ExerciseService.getAllExerciseGroupNames()
            .then(setExerciseGroupNames)
            .catch(() => setError('Error fetching exercise groups'))
            .finally(() => setLoading(false));
    }, []);

    return { exerciseGroupNames, loading, error };
}
