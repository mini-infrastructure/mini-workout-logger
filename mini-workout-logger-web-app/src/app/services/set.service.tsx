import axios from 'axios';
import type {ApiResponseDTO} from "../dtos/api-response.dto.tsx";
import type {SetReadDTO} from "../dtos/set-read.dto.tsx";
const apiUrl = import.meta.env.VITE_API_URL;
const lang = import.meta.env.VITE_API_LANGUAGE || 'en_US';

class SetService {

    async getAll(): Promise<SetReadDTO[]> {}
    async getById(id: string): Promise<SetReadDTO> {}
    async create(set: SetReadDTO): Promise<SetReadDTO> {}
    async update(id: string, set: SetReadDTO): Promise<SetReadDTO> {}
    async delete(id: string): Promise<void> {}

}

export default new SetService();