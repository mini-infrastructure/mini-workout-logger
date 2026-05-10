import axios from 'axios';
import type {ApiResponseDTO} from '../dtos/api-response.dto.tsx';
import type {ActivityLogReadDTO} from '../dtos/activity-log-read.dto.tsx';
import type {ActivityLogWriteDTO} from '../dtos/activity-log-write.dto.tsx';

const apiUrl = import.meta.env.VITE_API_URL;
const lang   = import.meta.env.VITE_API_LANGUAGE || 'en_US';

class ActivityLogService {

    async getAll(params: { page?: number; size?: number; search?: string } = {}): Promise<{ data: ActivityLogReadDTO[]; pagination: ApiResponseDTO<ActivityLogReadDTO[]>['pagination'] }> {
        const query = new URLSearchParams({ lang, page: String(params.page ?? 0), size: String(params.size ?? 10) });
        if (params.search) query.set('search', params.search);
        const response = await axios.get<ApiResponseDTO<ActivityLogReadDTO[]>>(
            `${apiUrl}/activity-logs?${query}`
        );
        return { data: response.data.data ?? [], pagination: response.data.pagination };
    }

    async create(dto: ActivityLogWriteDTO): Promise<ActivityLogReadDTO> {
        const response = await axios.post<ApiResponseDTO<ActivityLogReadDTO[]>>(
            `${apiUrl}/activity-logs?lang=${lang}`,
            dto
        );
        return response.data.data[0];
    }

    async delete(id: number): Promise<void> {
        await axios.delete(`${apiUrl}/activity-logs/${id}?lang=${lang}`);
    }

}

export default new ActivityLogService();
