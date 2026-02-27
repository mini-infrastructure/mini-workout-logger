import type {ExerciseReadDTO} from "../dtos/exercise-read.dto.tsx";
import type {ApiResponseDTO} from "../dtos/api-response.dto.tsx";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const lang = import.meta.env.VITE_API_LANGUAGE || 'en_US';

class ExerciseService {

    async getAll(): Promise<ExerciseReadDTO[]> {
        try {
            const response = await axios.get<ApiResponseDTO<ExerciseReadDTO[]>>(
                `${apiUrl}/exercises?lang=${lang}`
            );
            return response.data.data;
        } catch (error) {
            console.error('Error fetching exercises:', error);
            return [];
        }
    }

    async getById(id: string): Promise<ExerciseReadDTO> {
        try {
            const response = await axios.get<ApiResponseDTO<ExerciseReadDTO>>(
                `${apiUrl}/exercises/${id}?lang=${lang}`
            );
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching exercise with id ${id}:`, error);
            throw error;
        }
    }

    async create(exercise: ExerciseReadDTO): Promise<ExerciseReadDTO> {}
    async update(id: string, exercise: ExerciseReadDTO): Promise<ExerciseReadDTO> {}
    async delete(id: string): Promise<void> {}

}

export default new ExerciseService();