import type {DashboardReadDTO} from '../dtos/dashboard-read.dto.tsx';
import axios from 'axios';
import type {ApiResponseDTO} from '../dtos/api-response.dto.tsx';

const apiUrl = import.meta.env.VITE_API_URL;
const lang = import.meta.env.VITE_API_LANGUAGE || 'en_US';

class DashboardService {

    async getById(id: number): Promise<DashboardReadDTO> {
        const response = await axios.get<ApiResponseDTO<DashboardReadDTO[]>>(
            `${apiUrl}/dashboards/${id}`,
            { params: { lang } }
        );
        return response.data.data[0];
    }

    async getWorkoutCount(): Promise<number> {
        const response = await axios.get<ApiResponseDTO<number[]>>(
            `${apiUrl}/dashboards/workout-count`,
            { params: { lang } }
        );
        return response.data.data[0];
    }

    async getExecutionCount(): Promise<number> {
        const response = await axios.get<ApiResponseDTO<number[]>>(
            `${apiUrl}/dashboards/execution-count`,
            { params: { lang } }
        );
        return response.data.data[0];
    }
}

const dashboardService = new DashboardService();
export default dashboardService;
