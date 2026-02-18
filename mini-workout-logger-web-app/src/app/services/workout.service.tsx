import type {WorkoutReadDTO} from "../dtos/workout-read.dto.tsx";
import axios from "axios";
import type {ApiResponseDTO} from "../dtos/api-response.dto.tsx";
import type {MuscleReadDTO} from "../dtos/muscle-read.dto.tsx";

const apiUrl = import.meta.env.VITE_API_URL;
const lang = import.meta.env.VITE_API_LANGUAGE || 'en_US';

class WorkoutService {

    async getAll(): Promise<WorkoutReadDTO[]> {
        try {
            const response = await axios.get<ApiResponseDTO<MuscleReadDTO[]>>(
                `${apiUrl}/workouts?lang=${lang}`
            );
            return response.data.data;
        } catch (error) {
            console.error('Error fetching workouts:', error);
            return [];
        }
    }

    async getById(id: string): Promise<WorkoutReadDTO> {
        try {
            const response = await axios.get<ApiResponseDTO<WorkoutReadDTO>>(
                `${apiUrl}/workouts/${id}?lang=${lang}`
            );
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching workout with id ${id}:`, error);
            throw error;
        }
    }

    async create(workout: WorkoutReadDTO): Promise<WorkoutReadDTO> {}
    async update(id: string, workout: WorkoutReadDTO): Promise<WorkoutReadDTO> {}
    async delete(id: string): Promise<void> {}

}

export default new WorkoutService();