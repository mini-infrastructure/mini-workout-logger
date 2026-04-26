import axios from 'axios';
import type { ApiResponseDTO } from '../dtos/api-response.dto.tsx';
import type { TagReadDTO } from '../dtos/tag-read.dto.tsx';
import type { TagWriteDTO } from '../dtos/tag-write.dto.tsx';

const apiUrl = import.meta.env.VITE_API_URL;
const lang = import.meta.env.VITE_API_LANGUAGE || 'en_US';

class TagService {
    async create(name: string): Promise<TagReadDTO> {
        const payload: TagWriteDTO = { name };
        const response = await axios.post<ApiResponseDTO<TagReadDTO[]>>(
            `${apiUrl}/tags?lang=${lang}`,
            payload
        );
        return response.data.data[0];
    }
}

export default new TagService();
