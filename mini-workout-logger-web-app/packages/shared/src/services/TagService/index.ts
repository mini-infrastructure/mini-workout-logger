import axios from 'axios';
import type { ApiResponseDTO } from '../../dtos/ApiResponseDTO';
import type { TagReadDTO } from '../../dtos/TagReadDTO';
import type { TagWriteDTO } from '../../dtos/TagWriteDTO';

const apiUrl = import.meta.env.VITE_API_URL;
const lang = import.meta.env.VITE_API_LANGUAGE || 'en_US';

class TagService {
    async getAll(): Promise<TagReadDTO[]> {
        const response = await axios.get<ApiResponseDTO<TagReadDTO[]>>(
            `${apiUrl}/tags?lang=${lang}&size=1000`
        );
        return response.data.data;
    }

    async create(name: string): Promise<TagReadDTO> {
        const payload: TagWriteDTO = { name };
        const response = await axios.post<ApiResponseDTO<TagReadDTO[]>>(
            `${apiUrl}/tags?lang=${lang}`,
            payload
        );
        return response.data.data[0];
    }

    async update(id: number, name: string): Promise<TagReadDTO> {
        const payload: TagWriteDTO = { name };
        const response = await axios.put<ApiResponseDTO<TagReadDTO[]>>(
            `${apiUrl}/tags/${id}?lang=${lang}`,
            payload
        );
        return response.data.data[0];
    }
}

export default new TagService();
