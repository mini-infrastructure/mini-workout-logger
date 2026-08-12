import axios from 'axios';
import type {MuscleReadDTO} from "../../dtos/MuscleReadDTO/index.ts";
import type {MuscleWriteDTO} from "../../dtos/MuscleWriteDTO/index.ts";
import type {ApiResponseDTO} from "../../dtos/ApiResponseDTO/index.ts";

const apiUrl = import.meta.env.VITE_API_URL;
const lang = import.meta.env.VITE_API_LANGUAGE || 'en_US';

class MuscleService {

    async getAll(overrideLang?: string): Promise<MuscleReadDTO[]> {
        try {
            const response = await axios.get<ApiResponseDTO<MuscleReadDTO[]>>(
                `${apiUrl}/muscles?lang=${overrideLang ?? lang}&size=500`
            );
            return response.data.data;
        } catch (error) {
            console.error('Error getting muscles:', error);
            return [];
        }
    }

    async getRootMuscles(): Promise<String[]> {
        try {
            const response = await axios.get<ApiResponseDTO<String[]>>(
                `${apiUrl}/muscles/roots?lang=${lang}`
            );
            return response.data.data;
        } catch (error) {
            console.error('Error getting root muscles:', error);
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
            console.error(`Error getting muscle with id ${id}:`, error);
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
            console.error(`Error getting parent muscles for muscle with id ${muscleId}:`, error);
            return [];
        }
    }

    async create(_muscle: MuscleWriteDTO): Promise<MuscleReadDTO> {
        throw new Error('MuscleService.create not implemented');
    }
    async update(_id: string, _muscle: MuscleWriteDTO): Promise<MuscleReadDTO> {
        throw new Error('MuscleService.update not implemented');
    }
    async delete(_id: string): Promise<void> {
        throw new Error('MuscleService.delete not implemented');
    }

}

export default new MuscleService();