import axios from 'axios';
import type {MuscleReadDTO} from "../dtos/muscle-read.dto.tsx";
import type {MuscleWriteDTO} from "../dtos/muscle-write.dto.tsx";
import type {ApiResponseDTO} from "../dtos/api-response.dto.tsx";

const apiUrl = import.meta.env.VITE_API_URL;
const lang = import.meta.env.VITE_API_LANGUAGE || 'en_US';

class MuscleService {

    async getAll(): Promise<MuscleReadDTO[]> {
        try {
            const response = await axios.get<ApiResponseDTO<MuscleReadDTO[]>>(
                `${apiUrl}/muscles?lang=${lang}`
            );
            return response.data.data;
        } catch (error) {
            console.error('Error fetching muscles:', error);
            return [];
        }
    }

    async getById(id: string): Promise<MuscleReadDTO> {
        try {
            const response = await axios.get<ApiResponseDTO<MuscleReadDTO>>(
                `${apiUrl}/muscles/${id}?lang=${lang}`
            );
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching muscle with id ${id}:`, error);
            throw error;
        }
    }

    async getParentMuscles(muscleId: string): Promise<MuscleReadDTO[]> {
        try {
            const response = await axios.get<ApiResponseDTO<MuscleReadDTO[]>>(
                `${apiUrl}/muscles/${muscleId}/parents?lang=${lang}`
            );
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching parent muscles for muscle with id ${muscleId}:`, error);
            return [];
        }
    }

    async create(muscle: MuscleWriteDTO): Promise<MuscleReadDTO> {}
    async update(id: string, muscle: MuscleWriteDTO): Promise<MuscleReadDTO> {}
    async delete(id: string): Promise<void> {}

}

export default new MuscleService();